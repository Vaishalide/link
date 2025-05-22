const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Replace this with your actual video URL (with token)
const VIDEO_URL = 'https://d1d34p8vz63oiq.cloudfront.net/e473064e-ac57-4cd7-82a7-1b5658f6399d/master.mpd?token=YOUR_TOKEN_HERE';

app.get('/video', async (req, res) => {
  try {
    const response = await fetch(VIDEO_URL, {
      headers: {
        // If headers like authorization are needed, set them here
        // 'Authorization': 'Bearer your_token_here'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch video');
    }

    // Pipe the response stream to the client
    res.setHeader('Content-Type', 'application/dash+xml'); // or adjust MIME if needed
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}/video`);
});
