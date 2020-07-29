const core = require('@actions/core')
  , github = require('@actions/github')
  , RepositorySecrets = require("./repository-secrets")
  ;

async function run() {
  const token = core.getInput('github-token', {required: true})
    , secretName = core.getInput('secret-name')
    , secretValue = core.getInput('secret-value')
    , repoName = core.getInput('repository') || process.env['GITHUB_REPOSITORY']
    ;

  const repoSecrets = new RepositorySecrets(github.getOctokit(token), repoName);

  try {
    const result = await repoSecrets.saveOrUpdateSecret(secretName, secretValue);
    core.info(`Secret ${secretName} ${result.state} on repository ${repoName}`);
  } catch(err) {
    core.setFailed(err);
  }
}

run();
