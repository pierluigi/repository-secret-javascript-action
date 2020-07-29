const Encrypt = require('./encrypt');

module.exports = class RepositorySecrets {

  constructor(octokit, name) {
    if (!octokit) {
      throw new Error('An octokit client must be provided');
    }
    this._octokit = octokit;

    if (!name) {
      throw new Error('A repository name must be provided')
    }

    const parts = name.split('/');
    if (parts.length !== 2) {
      core.setFailed(`Repository name must be of the form "owner/repo", but was "${name}"`);
    }
    this._repo = {
      owner: parts[0],
      repo: parts[1]
    };
  }

  get repo() {
    return this._repo
  }

  get octokit() {
    return this._octokit;
  }

  get key() {
    return this._key ? this._key.key : null;
  }

  get keyId() {
    return this._key ? this._key.key_id : null;
  }

  get secretEncrypter() {
    const self = this;
    let promise;

    if (self._encrypter) {
      promise = Promise.resolve(self._encrypter);
    } else {
      promise = this.getPublicKey()
        .then(key => {
          self._encrypter = new Encrypt(key);
          return self._encrypter;
        });
    }

    return promise;
  }

  exists() {
    const repo = this.repo;

    return this.octokit.repos.get(repo)
      .catch(err => {
        return false;
      }).then(result => {
        return !!result.data;
      });
  }

  getPublicKey() {
    const self = this;

    if (self.key) {
      return Promise.resolve(self.key);
    } else {
      return self.exists()
        .then(exists => {
          if (!exists) {
            throw new Error(`Repository not found: ${this.repo.owner}/${this.repo.repo}`);
          }
          return self.octokit.actions.getRepoPublicKey(self.repo);
        }).then(result => {
          self._key = result.data;
          return result.data.key;
        });
    }
  }

  encryptSecret(value) {
    return this.secretEncrypter
      .then(encrypter => {
        return encrypter.encryptValue(value);
      });
  }

  saveOrUpdateSecret(name, value) {
    const self = this;

    return self.encryptSecret(value)
      .then(encryptedValue => {
        return self.octokit.actions.createOrUpdateRepoSecret({
          ...self.repo,
          secret_name: name,
          encrypted_value: encryptedValue,
          key_id: self.keyId,
        });
      }).catch(err => {
        throw new Error(`Failed to save secret; ${err.message}`);
      }).then(response => {
        let result;

        if (response.status === 201) {
          result = 'created';
        } else if (response.status === 204) {
          result = 'updated';
        } else {
          throw new Error(`Unexpected result from storing secret value; ${response.status}`);
        }

        return {state: result};
      });
  }
}