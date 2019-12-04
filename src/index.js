const Hapi = require("@hapi/hapi");
const { registerRoutes } = require("./register-routes");

const init = async () => {
  const server = Hapi.server({
    port: 80,
    host: "0.0.0.0"
  });

  await server.register({
    plugin: require("hapi-cors"),
    options: {
      origins: ["*"]
    }
  });

  await registerRoutes(server);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
