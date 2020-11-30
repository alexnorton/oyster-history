const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/events.json", {
      target: "https://d133v05vfq20cb.cloudfront.net/",
      changeOrigin: true,
    })
  );
};
