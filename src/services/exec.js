const boom = require("@hapi/boom");
const fs = require("fs");
const random = require("./random");
const { exec } = require("child_process");

const CONSISTENT_STORAGE_PATH = "./";
const EMULATOR_COMMAND = "qemu-arm";
const TIMEOUT = 10000;

module.exports = {
  deleteFile(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {}
  },

  run(content) {
    const input = random.fileName();
    const fullInput = `${CONSISTENT_STORAGE_PATH}/temp/${input}`;
    fs.writeFileSync(fullInput, content);

    return new Promise((res) => {
      const proc = exec(`${EMULATOR_COMMAND} "./${input}"`, {
        cwd: `${CONSISTENT_STORAGE_PATH}/temp`,
        timeout: TIMEOUT
      }, (err, stdout, stderr) => {
        const data = [];
        if (err) data.push(err.killed ? '* Timeout *' : `Program exited with code ${err.code}`);
        if (stdout) stdout.split("\n").forEach(l => data.push(l));
        if (stderr) stderr.split("\n").forEach(l => data.push(l));
        data.push("* Program ended *");
        this.deleteFile(fullInput);
        res(data);
      });
    });
  },
};
