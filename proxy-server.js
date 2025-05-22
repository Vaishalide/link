const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Replace this with your actual video URL (with token)
const VIDEO_URL = 'https://anonymousrajputplayer-9ab2f2730a02.herokuapp.com/pw?url=https://d1d34p8vz63oiq.cloudfront.net/e473064e-ac57-4cd7-82a7-1b5658f6399d/master.mpd&parentId=6669a9b099a1eb0018a3c57d&childId=666fee4a4d026800182d3bd6&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDg1MjkyNTYuNjg3LCJkYXRhIjp7Il9pZCI6IjY3NTEzYWJiMzVhNWFhODcyYzEwZWQ4ZiIsInVzZXJuYW1lIjoiOTg1NTE0Mjc3NSIsImZpcnN0TmFtZSI6IlN1cnlhbnNoIiwibGFzdE5hbWUiOiIiLCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWViMzkzZWU5NWZhYjc0NjhhNzlkMTg5Iiwid2Vic2l0ZSI6InBoeXNpY3N3YWxsYWguY29tIiwibmFtZSI6IlBoeXNpY3N3YWxsYWgifSwiZW1haWwiOiJzYXJpdGFzaW5naHNpbmdoOTc1MkBnbWFpbC5jb20iLCJyb2xlcyI6WyI1YjI3YmQ5NjU4NDJmOTUwYTc3OGM2ZWYiXSwiY291bnRyeUdyb3VwIjoiSU4iLCJ0eXBlIjoiVVNFUiJ9LCJpYXQiOjE3NDc5MjQ0NTZ9.5-AbG2bUmIk70ul8o8oUraozvxiynRreaoVijPWPgh4';

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
