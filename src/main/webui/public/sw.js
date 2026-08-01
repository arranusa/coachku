const CACHE_NAME = 'coachku-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Use a simple fetch-first or network-only strategy for now.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
