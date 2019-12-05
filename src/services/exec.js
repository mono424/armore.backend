const fs = require("fs");
const random = require("./random");
const { exec, execSync } = require("child_process");

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
    const fullInput = `./temp/${input}`;
    fs.writeFileSync(fullInput, content);

    try {
      execSync(`chmod +x "${fullInput}"`);
    } catch (error) {
      console.log('chmod +x failed', error);
    }

    return new Promise((res) => {
      exec(`${EMULATOR_COMMAND} "./${input}"`, {
        cwd: `./temp`,
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
