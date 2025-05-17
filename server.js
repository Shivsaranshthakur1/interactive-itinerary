const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const port = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg'
};

// In-memory storage for itinerary items
let itineraries = [];

function handleApi(req, res, parsedUrl) {
  if (req.method === 'GET' && parsedUrl.pathname === '/api/itinerary') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(itineraries));
    return true;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/itinerary') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const item = JSON.parse(body || '{}');
        itineraries.push(item);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(item));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return true;
  }

  return false;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  if (handleApi(req, res, parsedUrl)) return;

  let filePath = path.join(__dirname, 'public', parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
