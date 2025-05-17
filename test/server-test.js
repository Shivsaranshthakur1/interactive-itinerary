const http = require('http');
const child_process = require('child_process');
const assert = require('assert');

const server = child_process.spawn('node', ['server.js']);

server.stdout.on('data', data => {
  // Wait for server to start then run test
  if (data.toString().includes('Server running')) {
    http.get('http://localhost:3000', res => {
      try {
        assert.strictEqual(res.statusCode, 200);
        console.log('Test passed');
        server.kill();
      } catch (err) {
        console.error('Test failed', err);
        server.kill();
        process.exitCode = 1;
      }
    }).on('error', err => {
      console.error('Request error', err);
      server.kill();
      process.exitCode = 1;
    });
  }
});
