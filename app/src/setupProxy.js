const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/events.json", {
      target: process.env.EVENTS_URL,
      changeOrigin: true,
    })
  );
};
