const fs = require('fs');
const Hapi = require("@hapi/hapi");
const { registerRoutes } = require("./register-routes");

const init = async () => {
  const server = Hapi.server({
    port: 443,
    host: "0.0.0.0",
    tls: {
      key: fs.readFileSync(`${__dirname}/../cert/server.key`),
      cert: fs.readFileSync(`${__dirname}/../cert/server.cert`)
    }
  });

  await server.register({
    plugin: require("hapi-cors"),
    options: {
      origins: [
        "https://armore-e8de7.web.app",
        "https://armore-e8de7.firebaseapp.com",
        "https://armore.khadimfall.com"
      ]
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
