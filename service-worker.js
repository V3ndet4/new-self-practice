const CACHE_NAME = "new-self-practice-v1.1-personal-journey-map";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=1.1",
  "./app.js?v=1.1",
  "./manifest.webmanifest",
  "./icon.svg",
  "./assets/sunset-beach.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => caches.match("./index.html")))
  );
});
