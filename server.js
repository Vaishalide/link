const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PLAYER_BASE = 'https://anonymousrajputplayer-9ab2f2730a02.herokuapp.com/pw?url=https://d1d34p8vz63oiq.cloudfront.net/e473064e-ac57-4cd7-82a7-1b5658f6399d/master.mpd&parentId=6669a9b099a1eb0018a3c57d&childId=666fee4a4d026800182d3bd6&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDg1MjkyNTYuNjg3LCJkYXRhIjp7Il9pZCI6IjY3NTEzYWJiMzVhNWFhODcyYzEwZWQ4ZiIsInVzZXJuYW1lIjoiOTg1NTE0Mjc3NSIsImZpcnN0TmFtZSI6IlN1cnlhbnNoIiwibGFzdE5hbWUiOiIiLCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWViMzkzZWU5NWZhYjc0NjhhNzlkMTg5Iiwid2Vic2l0ZSI6InBoeXNpY3N3YWxsYWguY29tIiwibmFtZSI6IlBoeXNpY3N3YWxsYWgifSwiZW1haWwiOiJzYXJpdGFzaW5naHNpbmdoOTc1MkBnbWFpbC5jb20iLCJyb2xlcyI6WyI1YjI3YmQ5NjU4NDJmOTUwYTc3OGM2ZWYiXSwiY291bnRyeUdyb3VwIjoiSU4iLCJ0eXBlIjoiVVNFUiJ9LCJpYXQiOjE3NDc5MjQ0NTZ9.5-AbG2bUmIk70ul8o8oUraozvxiynRreaoVijPWPgh4';

app.use('/myplayer', createProxyMiddleware({
  target: PLAYER_BASE,
  changeOrigin: true,
  pathRewrite: {
    '^/myplayer': '/pw' // rewrites /myplayer → /pw on target
  }
}));

app.listen(3000, () => {
  console.log('Proxy running at http://localhost:3000/myplayer');
});
