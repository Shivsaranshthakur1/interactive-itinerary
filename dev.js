const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

let server;
let opened = false;
let exiting = false;

function openBrowser(url) {
  if (!process.env.BROWSER || process.env.BROWSER === 'none') return;
  let cmd;
  let args = [];
  if (process.platform === 'darwin') {
    cmd = 'open';
    args = [url];
  } else if (process.platform === 'win32') {
    cmd = 'cmd';
    args = ['/c', 'start', url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }
  try {
    const child = spawn(cmd, args);
    child.on('error', err => {
      console.error('Unable to open browser:', err.message);
    });
  } catch (err) {
    console.error('Unable to open browser:', err.message);
  }
}

function startServer() {
  if (server) server.kill();
  server = spawn('node', ['server.js'], { stdio: 'inherit' });
  console.log('Preview: http://localhost:3000');
  if (!opened) {
    openBrowser('http://localhost:3000');
    opened = true;
  }
}

startServer();

const watchPaths = [path.join(__dirname, 'public'), path.join(__dirname, 'server.js')];
watchPaths.forEach(p => {
  fs.watch(p, { recursive: true }, () => {
    if (exiting) return;
    console.log('Change detected. Restarting server...');
    startServer();
  });
});

process.on('SIGINT', () => {
  exiting = true;
  if (server) server.kill();
  process.exit();
});
