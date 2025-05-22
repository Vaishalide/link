import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url=');

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1'
      }
    });

    res.set('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send('Fetch failed: ' + error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Mobile proxy running on port ${port}`);
});
