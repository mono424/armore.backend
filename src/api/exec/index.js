const execService = require("../../services/exec");

module.exports = {
  async post(request, h) {
    const { data } = request.payload;
    const res = await execService.run(Buffer.from(data));
    return { data: res };
  }
};
