const boom = require("@hapi/boom");
const fs = require("fs");
const random = require("./random");
const { exec } = require("child_process");

const COMMANDS = {
  ASSAMBLE: (content, fileName) =>
    `echo ${JSON.stringify(content)} | arm-linux-gnueabi-as -o "${fileName}"`,
  LINK: (input, output) =>
    `arm-linux-gnueabi-ld "${input}" -o "${output}"`
};

module.exports = {
  deleteFile(path) {
    try {
      fs.unlinkSync(path);
    } catch (error) {}
  },

  returnAndDeleteFile(path) {
    try {
      const content = fs.readFileSync(path);
      fs.unlinkSync(path);
      return content;
    } catch (error) {
      return null;
    }
  },

  assamble(content) {
    const rndId = random.fileName();
    const output = rndId + ".o";
    const fullOutput = `${__dirname}/../../temp/${output}`;
    
    const proc = exec(COMMANDS.ASSAMBLE(content, output), {
      cwd: `${__dirname}/../../temp`
    });

    return new Promise((res, rj) => {
      let err = false;
      proc.stderr.on("data", (e) => {
        console.warn(e);
        err = e;
      });
      proc.on("close", async () => {
        const content = this.returnAndDeleteFile(fullOutput);

        if (!content) {
          rj(boom.badRequest(err || 'Unknown error.'));
        } else {
          res(content);
        }
      });
    });
  },

  link(content) {
    const rndId = random.fileName();
    const input = rndId + ".o";
    const fullInput = `${__dirname}/../../temp/${input}`;
    fs.writeFileSync(fullInput, content);

    const output = rndId;
    const fullOutput = `${__dirname}/../../temp/${output}`;

    const proc = exec(COMMANDS.LINK(input, output), {
      cwd: `${__dirname}/../../temp`
    });

    return new Promise((res, rj) => {
      let err = false;
      proc.stderr.on("data", (e) => {
        console.warn(e);
        err = e;
      });
      proc.on("close", () => {
        this.deleteFile(fullInput);
        const content = this.returnAndDeleteFile(fullOutput);

        if (!content) {
          rj(boom.badRequest(err || "Unknown error."));
        } else {
          res(content);
        }
      });
    });
  }
};
