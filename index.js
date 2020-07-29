const core = require("@actions/core");
const encrypt = require("./encrypt");

async function run() {
  try {
    const value = core.getInput("value");
    const encrypted = await encrypt(
      value,
      process.env.INPUT_TOKEN,
      process.env.INPUT_OWNER
    );
    // core.info(`Encrypted ${encrypted} from ${value}`);
    console.log(encrypted);
    // TODO store secret
  } catch (error) {
    console.log("Error", error);
    core.setFailed(error.message);
  }
}

run();
