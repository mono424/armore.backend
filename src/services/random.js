const generate = require("nanoid/generate");
module.exports = {
  fileName() {
    return generate('abcdefghijklmnopqrstuvwxyz', 12);
  }
};
