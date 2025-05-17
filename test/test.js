const http = require('http');
const { spawn } = require('child_process');
const assert = require('assert');

// Suppress browser launching when running dev.js
const env = Object.assign({}, process.env, { BROWSER: 'none' });

function start(script, callback) {
  const child = spawn('node', [script], { env });
  child.stdout.on('data', data => {
    if (data.toString().includes('Server running')) {
      callback(child);
    }
  });
  return child;
}

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve({ res, data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function runServerTests() {
  return new Promise(resolve => {
    start('server.js', async server => {
      try {
        const index = await request('http://localhost:3000');
        assert.strictEqual(index.res.statusCode, 200);

        const item = { day: 4, location: 'Beach', activity: 'Swim' };
        const post = await request({
          hostname: 'localhost',
          port: 3000,
          path: '/api/itinerary',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }, JSON.stringify(item));
        assert.strictEqual(post.res.statusCode, 200);

        const list = await request('http://localhost:3000/api/itinerary');
        const itinerary = JSON.parse(list.data);
        assert.ok(itinerary.some(i => i.day === 4 && i.location === 'Beach'));
        console.log('Server API test passed');
      } catch (err) {
        console.error('Server API test failed', err);
        process.exitCode = 1;
      } finally {
        server.kill();
        resolve();
      }
    });
  });
}

async function runDevTest() {
  return new Promise(resolve => {
    const dev = spawn('node', ['dev.js'], { env });
    let output = '';
    dev.stdout.on('data', data => {
      output += data.toString();
      if (output.includes('Preview:') && output.includes('Server running')) {
        console.log('Dev startup message test passed');
        dev.kill();
        resolve();
      }
    });
  });
}

(async () => {
  await runServerTests();
  await runDevTest();
})();
