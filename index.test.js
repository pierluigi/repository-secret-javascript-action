// const wait = require("./wait");
const process = require("process");
const cp = require("child_process");
const path = require("path");
const encrypt = require("./encrypt");

// test('throws invalid number', async () => {
//   await expect(wait('foo')).rejects.toThrow('milliseconds not a number');
// });

// test('wait 500 ms', async () => {
//   const start = new Date();
//   await wait(500);
//   const end = new Date();
//   var delta = Math.abs(end - start);
//   expect(delta).toBeGreaterThan(450);
// });

test("encrypt a value", async () => {
  let res = await encrypt("key", "value");
  console.log(res);
});

// shows how the runner will run a javascript action with env / stdout protocol
// test("test runs", () => {
//   process.env["INPUT_MILLISECONDS"] = 500;
//   const ip = path.join(__dirname, "index.js");
//   console.log(cp.execSync(`node ${ip}`, { env: process.env }).toString());
// });
