const CACHE_NAME = "countdown-cache-v2";
const urlsToCache = [
    "/index.html",
    "/assets/site.webmanifest",
    "/assets/favicon-96x96.png",
    "/assets/favicon.svg",
    "/assets/favicon.ico",
    "/assets/apple-touch-icon.png",
    "/assets/web-app-manifest-192x192.png",
    "/assets/web-app-manifest-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});