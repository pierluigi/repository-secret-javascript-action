const expect = require('chai').expect
  , github = require('@actions/github')
  , RepositorySecrets = require('./repository-secrets')
  ;

const octokit = github.getOctokit('xxxx')

describe('RepositorySecrets', () => {

  // it('should do stuff', async () => {
  //   const repoSecrets = new RepositorySecrets(octokit, 'peter-murray/testing');
  //
  //   const result = await repoSecrets.saveOrUpdateSecret('test', 'hello world 1');
  //   console.log(result);
  // });
});