const express = require('express');
const request = require('request');
const app = express();

const targetBaseUrl = 'https://muftukmall.fun';

app.use('/pw', (req, res) => {
  const url = targetBaseUrl + req.url.replace('/pw', '');
  req.pipe(request(url)).pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
