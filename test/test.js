const http = require('http');
const child_process = require('child_process');
const assert = require('assert');

const server = child_process.spawn('node', ['server.js']);

function waitForServer() {
  return new Promise(resolve => {
    server.stdout.on('data', data => {
      if (data.toString().includes('Server running')) resolve();
    });
  });
}

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ res, data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  await waitForServer();
  try {
    let result = await request({ hostname: 'localhost', port: 3000, path: '/' });
    assert.strictEqual(result.res.statusCode, 200);

    result = await request({ hostname: 'localhost', port: 3000, path: '/api/itinerary' });
    assert.strictEqual(result.res.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(result.data), []);

    result = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/itinerary',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ name: 'test' }));
    assert.strictEqual(result.res.statusCode, 201);

    result = await request({ hostname: 'localhost', port: 3000, path: '/api/itinerary' });
    const data = JSON.parse(result.data);
    assert.strictEqual(data.length, 1);
    assert.strictEqual(data[0].name, 'test');

    console.log('All tests passed');
  } catch (err) {
    console.error('Test failed', err);
    process.exitCode = 1;
  } finally {
    server.kill();
  }
}

run();
