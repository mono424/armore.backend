const boom = require("@hapi/boom");
const fs = require("fs");
const nanoid = require("nanoid");
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
    const output = nanoid() + ".o";
    const fullOutput = `${__dirname}/../../temp/${output}`;

    const proc = exec(COMMANDS.ASSAMBLE(content, output), {
      cwd: `${__dirname}/../../temp`
    });

    return new Promise((res, rj) => {
      let err = false;
      proc.stderr.on("data", ({ err: e }) => {
        err = e;
      });
      proc.on("close", async () => {
        const content = this.returnAndDeleteFile(fullOutput);

        if (!content && err) {
          rj(boom.internal(err));
        } else {
          res(content);
        }
      });
    });
  },

  link(content) {
    const input = nanoid() + ".o";
    const fullInput = `${__dirname}/../../temp/${input}`;
    fs.writeFileSync(fullInput, content);

    const output = nanoid() + "";
    const fullOutput = `${__dirname}/../../temp/${output}`;

    const proc = exec(COMMANDS.LINK(input, output), {
      cwd: `${__dirname}/../../temp`
    });

    return new Promise((res, rj) => {
      let err = false;
      proc.stderr.on("data", ({ err: e }) => {
        err = e;
      });
      proc.on("close", () => {
        this.deleteFile(fullInput);
        const content = this.returnAndDeleteFile(fullOutput);

        if (!content && err) {
          console.log(err);
          rj(boom.internal(err));
        } else {
          res(content);
        }
      });
    });
  }
};
