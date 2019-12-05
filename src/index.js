const fs = require('fs');
const Hapi = require("@hapi/hapi");
const { registerRoutes } = require("./register-routes");

const IS_PROD = process.env.NODE_ENV === 'production';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || (IS_PROD ? 443 : 80),
    host: "0.0.0.0",
    tls: IS_PROD
      ? {
          key:
            process.env.TLS_KEY ?
            Buffer.from(process.env.TLS_KEY, "base64").toString() :
            fs.readFileSync(`${__dirname}/../cert/server.key`),
          cert:
            process.env.TLS_CERT ?
            Buffer.from(process.env.TLS_CERT, "base64").toString() :
            fs.readFileSync(`${__dirname}/../cert/server.cert`)
        }
      : undefined
  });

  await server.register({
    plugin: require("hapi-cors"),
    options: {
      origins:
        IS_PROD ? [
          ("https://armore-e8de7.web.app",
          "https://armore-e8de7.firebaseapp.com",
          "https://armore.khadimfall.com")
        ] : ['*']
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
