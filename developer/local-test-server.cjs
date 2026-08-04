const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
http.createServer((request, response) => {
  const requested = decodeURIComponent(request.url.split('?')[0]);
  const relative = requested === '/' ? 'onepiecerollv4.html' : requested.replace(/^\//, '');
  const target = path.resolve(root, relative);
  if (!target.startsWith(root)) { response.statusCode = 403; response.end('Forbidden'); return; }
  fs.readFile(target, (error, data) => {
    if (error) { response.statusCode = 404; response.end('Not found'); return; }
    const extension = path.extname(target);
    response.setHeader('Content-Type', extension === '.js' ? 'text/javascript; charset=utf-8' : extension === '.html' ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8');
    response.end(data);
  });
}).listen(8765, '127.0.0.1');
