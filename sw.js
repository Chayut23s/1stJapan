/* 1st Japan Trip — offline cache
   เปลี่ยนเลข VERSION ทุกครั้งที่แก้ไฟล์ เพื่อให้มือถือโหลดของใหม่ */
var VERSION = "jp1-v1";
var CORE = [
  "./",
  "index.html",
  "style.css",
  "data.js",
  "app.js",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) { return cache.addAll(CORE); }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  // Google Fonts: cache after first load
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(VERSION + "-fonts").then(function (cache) {
        return cache.match(req).then(function (hit) {
          return hit || fetch(req).then(function (res) {
            cache.put(req, res.clone());
            return res;
          });
        });
      })
    );
    return;
  }

  // own files: network first (fresh when online), cache when offline
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(VERSION).then(function (cache) { cache.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) {
          return hit || caches.match("index.html");
        });
      })
    );
  }
});
