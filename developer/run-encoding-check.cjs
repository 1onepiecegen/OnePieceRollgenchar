/* Node entry point: fail the release check if source files contain mojibake markers. */
const fs = require('fs');
const path = require('path');
const { scanText } = require('./encoding-check.js');
const root = path.resolve(__dirname, '..');
const extensions = new Set(['.html', '.js', '.css', '.json', '.md']);
const ignored = new Set(['node_modules', '.git']);
const files = [];
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) { if (!ignored.has(entry.name)) visit(path.join(directory, entry.name)); continue; }
    const file = path.join(directory, entry.name);
    if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(file);
  }
}
visit(root);
const findings = files.flatMap(file => scanText(fs.readFileSync(file, 'utf8'), path.relative(root, file)));
const result = { pass: findings.length === 0, scannedFiles: files.length, findings };
console.log(JSON.stringify(result, null, 2));
if (!result.pass) process.exitCode = 1;
