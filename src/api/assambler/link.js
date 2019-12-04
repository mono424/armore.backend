const armService = require("../../services/arm");

module.exports = {
  async post(request, h) {
    const { data } = request.payload;
    const res = await armService.link(Buffer.from(data));
    return { data: res };
  }
};
