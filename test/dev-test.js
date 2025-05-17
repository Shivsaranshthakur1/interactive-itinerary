const http = require('http');
const child_process = require('child_process');
const assert = require('assert');

// Suppress browser opening in tests
const env = Object.assign({}, process.env, { BROWSER: 'none' });
const server = child_process.spawn('node', ['dev.js'], { env });

let started = false;
server.stdout.on('data', data => {
  const output = data.toString();
  if (!started && output.includes('Server running')) {
    started = true;
    http.get('http://localhost:3000', res => {
      try {
        assert.strictEqual(res.statusCode, 200);
        console.log('Dev server test passed');
        server.kill();
      } catch (err) {
        console.error('Dev server test failed', err);
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
