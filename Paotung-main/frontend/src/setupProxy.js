const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1/auth/register",
    createProxyMiddleware({
      target: "https://paotooong.thinc.in.th",
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq, req) => {
        if (req.body) {
          let bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },
    })
  );

  
};
