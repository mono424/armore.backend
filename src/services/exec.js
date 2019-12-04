const boom = require("@hapi/boom");
const fs = require("fs");
const nanoid = require("nanoid");
const { exec } = require("child_process");

const TIMEOUT = 10000;

module.exports = {
  deleteFile(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {}
  },

  run(content) {
    const input = nanoid();
    const fullInput = `${__dirname}/../../temp/${input}`;
    fs.writeFileSync(fullInput, content);
    
    const proc = exec("qemu-arm ./" + input, {
      cwd: `${__dirname}/../../temp`
    });

    return new Promise((res) => {
      let isRunning = true;
      const tid = setTimeout(() => {
        if (isRunning) {
          data.push("* Killing Process [Timeout] *");
          proc.kill("SIGINT");
        }
      }, TIMEOUT)
      let data = [];
      proc.stderr.on("data", e => {
        data.push(e);
      });
      proc.stdout.on("data", e => {
        data.push(e);
      });
      proc.on("exit", async () => {
        clearTimeout(tid);
        isRunning = false;
        data.push("* Program ended *");
        this.deleteFile(fullInput);
        res(data);
      });
    });
  },
};
