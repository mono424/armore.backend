const boom = require("@hapi/boom");
const execService = require("../../services/exec");

module.exports = {
  async post(request, h) {
    const { data } = request.payload;
    try {
      const res = await execService.run(Buffer.from(data));
      return { data: res };
    } catch (error) {
      console.log(error);
      return boom.internal();
    }
  }
};
