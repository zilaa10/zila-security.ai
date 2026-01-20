const CACHE_NAME = "zila-security-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/security.html",
  "/ai.html",
  "/css/style.css",
  "/js/three-bg.js",
  "/js/lang.js",
  "/js/chatbot.js",
  "/js/script.js",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
