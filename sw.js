/* Steady Study service worker. Lets the app open with no internet.
   The version and file list are filled in by scripts/build.mjs. */
var CACHE = 'steady-study-49ef61252e18';
var ASSETS = [
  "./",
  "./about.html",
  "./app.js",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./index.html",
  "./licenses.txt",
  "./manifest.webmanifest",
  "./page.css",
  "./privacy.html",
  "./terms.html"
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k.indexOf('steady-study-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') { return; }
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) { return; }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) { return hit; }
      return fetch(req).catch(function () {
        return req.mode === 'navigate' ? caches.match('./index.html') : Response.error();
      });
    })
  );
});
