'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const dist = path.resolve(__dirname, '../dist');

function normalizeSiteUrl(value) {
  const url = new URL(value || 'https://ssotoelektrik.com.tr');
  assert(['http:', 'https:'].includes(url.protocol), 'SITE_URL http veya https olmalıdır.');
  return url.href.replace(/\/+$/, '');
}

function normalizeBasePath(value) {
  let basePath = String(value || '').trim();
  if (!basePath || basePath === '/') return '';
  if (!basePath.startsWith('/')) basePath = `/${basePath}`;
  basePath = basePath.replace(/\/+$/, '');
  assert(!basePath.includes('..') && !/[?#]/.test(basePath), 'BASE_PATH geçersiz.');
  return basePath;
}

const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
const basePath = normalizeBasePath(process.env.BASE_PATH);
const publicPath = route => basePath + (route.startsWith('/') ? route : `/${route}`);

function walk(directory, predicate) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(fullPath, predicate));
    else if (predicate(fullPath)) result.push(fullPath);
  }
  return result;
}

function routeFor(file) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/index\.html$/, '')}`;
}

function localFileFor(url, sourceRoute) {
  const clean = url.split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith('#')) return null;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(clean)) return null;

  let route;
  if (clean.startsWith('/')) {
    if (basePath) {
      assert(clean === basePath || clean.startsWith(`${basePath}/`), `Kök yol BASE_PATH dışında: ${clean}`);
      route = clean.slice(basePath.length) || '/';
    } else route = clean;
  } else {
    const sourceDirectory = sourceRoute.endsWith('/') ? sourceRoute : path.posix.dirname(sourceRoute);
    route = path.posix.resolve(sourceDirectory, clean);
  }

  const relative = route.replace(/^\/+/, '');
  if (!relative || route.endsWith('/')) return path.join(dist, relative, 'index.html');
  return path.join(dist, relative);
}

assert(fs.existsSync(path.join(dist, 'index.html')), 'dist/index.html bulunamadı.');
assert(fs.existsSync(path.join(dist, '.nojekyll')), 'dist/.nojekyll bulunamadı.');

const htmlFiles = walk(dist, file => file.endsWith('.html'));
assert.equal(htmlFiles.length, 12, 'Beklenen HTML sayfa sayısı 12.');

const titles = new Set();
const descriptions = new Set();
const publicUrls = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeFor(file);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

  assert(title, `${route}: title eksik.`);
  assert(description, `${route}: description eksik.`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: tek H1 olmalı.`);
  assert(!titles.has(title), `${route}: yinelenen title.`);
  assert(!descriptions.has(description), `${route}: yinelenen description.`);
  titles.add(title);
  descriptions.add(description);
  assert.equal(canonical, siteUrl + route, `${route}: canonical hatalı.`);
  if (route === '/404.html') assert(/<meta name="robots" content="noindex, follow">/.test(html), '404 noindex olmalı.');

  for (const match of html.matchAll(/\b(?:href|src|action)="([^"]+)"/g)) publicUrls.push([match[1], route]);
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) publicUrls.push([candidate.trim().split(/\s+/, 1)[0], route]);
  }
}

for (const [url, route] of publicUrls) {
  const file = localFileFor(url, route);
  if (file) assert(fs.existsSync(file), `${route}: yerel hedef bulunamadı: ${url}`);
}

for (const cssFile of walk(dist, file => file.endsWith('.css'))) {
  const css = fs.readFileSync(cssFile, 'utf8');
  for (const match of css.matchAll(/url\((?:['"]?)([^)'"\s]+)(?:['"]?)\)/g)) {
    const url = match[1];
    if (/^(?:data:|https?:|\/\/)/i.test(url)) continue;
    const target = url.split(/[?#]/, 1)[0];
    assert(fs.existsSync(path.resolve(path.dirname(cssFile), target)), `${path.relative(dist, cssFile)}: CSS hedefi bulunamadı: ${url}`);
  }
}

const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'site.webmanifest'), 'utf8'));
assert.equal(manifest.start_url, publicPath('/'), 'Manifest start_url hatalı.');
for (const icon of manifest.icons || []) {
  const file = localFileFor(icon.src, '/');
  assert(file && fs.existsSync(file), `Manifest ikonu bulunamadı: ${icon.src}`);
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(sitemapUrls.length, 11, 'Sitemap 11 yayın sayfası içermeli.');
assert(sitemapUrls.every(url => url === `${siteUrl}/` || url.startsWith(`${siteUrl}/`)), 'Sitemap URL alan adı hatalı.');
assert(fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8').includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots.txt sitemap adresi hatalı.');

const jsCheck = spawnSync(process.execPath, ['--check', path.join(dist, 'assets/js/main.js')], { encoding: 'utf8' });
assert.equal(jsCheck.status, 0, jsCheck.stderr || 'JavaScript sözdizimi hatası.');

console.log(`Statik yayın kontrolü başarılı: ${htmlFiles.length} HTML, ${publicUrls.length} bağlantı/varlık, ${sitemapUrls.length} sitemap URL'si.`);
