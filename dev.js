const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

let serverProcess;
let restartTimer;

function start() {
  serverProcess = spawn('node', ['server.js'], { stdio: 'inherit' });
}

function restart() {
  if (serverProcess) {
    serverProcess.kill();
  }
  start();
}

function scheduleRestart() {
  if (restartTimer) return;
  restartTimer = setTimeout(() => {
    restartTimer = null;
    console.log('Restarting server...');
    restart();
  }, 100);
}

start();

const watchOptions = { recursive: true };

fs.watch(path.join(__dirname, 'public'), watchOptions, scheduleRestart);
fs.watch(path.join(__dirname, 'server.js'), scheduleRestart);

process.on('SIGINT', () => {
  if (serverProcess) serverProcess.kill();
  process.exit();
});
