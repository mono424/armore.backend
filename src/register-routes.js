module.exports = {

  registerRoutes(server) {

      server.route({
        method: "GET",
        path: "/",
        handler: require('./api').get
      });
      
      server.route({
        method: "POST",
        path: "/assambler/assamble",
        handler: require('./api/assambler/assamble').post
      });

      server.route({
        method: "POST",
        path: "/assambler/link",
        handler: require('./api/assambler/link').post
      });

      server.route({
        method: "POST",
        path: "/exec",
        handler: require('./api/exec/index').post
      });
      
  }

}