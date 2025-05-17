const { spawn } = require('child_process');
const path = require('path');

const tests = ['server-test.js', 'dev-test.js'];
let index = 0;
let exitCode = 0;

function runNext() {
  if (index >= tests.length) {
    process.exit(exitCode);
    return;
  }
  const testFile = path.join(__dirname, tests[index++]);
  const child = spawn('node', [testFile], { stdio: 'inherit' });
  child.on('exit', code => {
    if (code !== 0) exitCode = code;
    runNext();
  });
}

runNext();
