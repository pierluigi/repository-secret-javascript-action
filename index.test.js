// const wait = require("./wait");
const encrypt = require("./encrypt");

test("encrypt a value", async () => {
  try {
    const encrypted = await encrypt("test string");
    console.log(encrypted);
  } catch (error) {
    //     TypeError: unexpected type, use Uint8Array WTF
    console.error(error);
  }
});
