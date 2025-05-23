const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/muft', createProxyMiddleware({
  target: 'https://muftukmall.fun',
  changeOrigin: true,
  pathRewrite: { '^/muft': '' },
  onProxyRes: function (proxyRes) {
    // Remove frame-blocking headers
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy running at http://localhost:${PORT}`);
});
