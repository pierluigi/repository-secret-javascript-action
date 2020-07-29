const core = require("@actions/core");
const encrypt = require("./encrypt");

async function run() {
  try {
    const value = core.getInput("value");
    console.log("Sorry, just debuggin'");
    console.log(value);
    console.log(`Owner: ${process.env.INPUT_OWNER}`);
    const encrypted = await encrypt(value);
    core.info(`Encrypted ${encrypted} from ${value}`);
    console.log(encrypted);
    // TODO store secret
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
