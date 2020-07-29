const sodium = require("tweetsodium");
const octokit = require("@actions/github");
const dotenv = require("dotenv"); // TODO remove for Action environment

dotenv.config();

let encrypt = async function (secretValue) {
  const github = octokit.getOctokit(process.env.INPUT_TOKEN);

  const {
    data: { key: publicKey },
  } = await github.actions.getOrgPublicKey({
    org: process.env.INPUT_OWNER,
  });

  const encrypted = sodium.seal(
    Buffer.from(secretValue),
    Buffer.from(publicKey, "base64")
  );
  //   console.log(Buffer.from(encrypted).toString("base64"));

  return encrypted;
};

module.exports = encrypt;