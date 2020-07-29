const sodium = require("tweetsodium");

module.exports = class Encrypt {

  constructor(publicKey) {
    this._publicKey = requireValue('publicKey', publicKey);
  }

  get publicKey() {
    return this._publicKey;
  }

  encryptValue(value) {
    const strValue = requireValue('value', value);

    const valueBuffer = Buffer.from(strValue)
      , publicKeyBuffer = Buffer.from(this.publicKey, 'base64')
      ;

    const bytes = sodium.seal(valueBuffer, publicKeyBuffer);
    return Buffer.from(bytes).toString('base64');
  }
}

function requireValue(name, value) {
  if (value === null || value === undefined) {
    throw new Error(`Need to provide a value for argument "${name}"`);
  }

  const strValue = `${value}`.trim();
  if (strValue.length === 0) {
    throw new Error(`"${name}" value provided was zero length or empty string`)
  }

  return strValue;
}
