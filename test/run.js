const { spawn } = require('child_process');
const path = require('path');

const testFile = path.join(__dirname, 'test.js');
const child = spawn('node', [testFile], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
