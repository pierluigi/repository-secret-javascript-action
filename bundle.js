(function () {
  'use strict';

  const core = require("@actions/core");
  const encrypt = require("./encrypt");

  async function run() {
    try {
      const encrypted = await encrypt("test string");
      console.log(encrypted);
      // TODO store secret
    } catch (error) {
      core.setFailed(error.message);
    }
  }

  run();

}());
