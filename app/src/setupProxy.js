const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/events.json', {
      target: process.env.EVENTS_URL,
      changeOrigin: true,
    })
  );
};
