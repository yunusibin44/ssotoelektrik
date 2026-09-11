const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const root = path.resolve(__dirname, '../dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};
http.createServer((req,res)=>{
  let url; try { url = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  let file = path.resolve(root, '.' + url);
  if(file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if(fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if(!url.endsWith('/')) { res.writeHead(301,{Location:url+'/'}).end(); return; }
    file = path.join(file,'index.html');
  }
  const exists = fs.existsSync(file) && fs.statSync(file).isFile();
  if(!exists) file = path.join(root,'404.html');
  const compress=/\b gzip\b|\bgzip\b/.test(req.headers['accept-encoding']||'')&&/\.(html|css|js|svg|txt|xml|webmanifest)$/.test(file);
  const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Vary':'Accept-Encoding'};
  if(compress)headers['Content-Encoding']='gzip';
  res.writeHead(exists?200:404,headers);
  const stream=fs.createReadStream(file);
  if(compress)stream.pipe(zlib.createGzip()).pipe(res);else stream.pipe(res);
}).listen(4173,'127.0.0.1',()=>console.log('SS Oto Elektrik hazır: http://127.0.0.1:4173'));
