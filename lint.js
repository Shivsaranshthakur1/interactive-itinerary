const fs = require('fs');
const path = require('path');
const vm = require('vm');

function lintFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  try {
    new vm.Script(code);
    console.log(`✔ ${file}`);
    return true;
  } catch (err) {
    console.error(`✖ ${file} - ${err.message}`);
    return false;
  }
}

function walk(dir) {
  let results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const filePath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('.');
let ok = true;
files.forEach(file => {
  if (!lintFile(file)) ok = false;
});
process.exitCode = ok ? 0 : 1;
