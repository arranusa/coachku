const CACHE_NAME = 'coachku-v2';
const STATIC_CACHE = 'coachku-static-v2';
const DYNAMIC_CACHE = 'coachku-dynamic-v2';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/android/launchericon-192x192.png',
];

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => {
      return clients.claim();
    })
  );
});

// Fetch: cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (except our own)
  if (url.origin !== location.origin) return;

  // Skip API requests - always use network
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/q/')) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(JSON.stringify({ error: 'Offline' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
    return;
  }

  // For navigation requests (HTML pages), use network-first with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fresh response
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cached index.html for SPA navigation
          return caches.match('/index.html').then((cached) => {
            return cached || new Response('Offline - Please check your connection', {
              status: 503,
              headers: { 'Content-Type': 'text/html' },
            });
          });
        })
    );
    return;
  }

  // For static assets (JS, CSS, images, fonts), use cache-first
  if (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot)$/)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => {
          // Return placeholder for images
          if (url.pathname.match(/\.(png|jpg|jpeg|gif)$/)) {
            return caches.match('/icons/android/launchericon-192x192.png');
          }
          return new Response('', { status: 503 });
        });
      })
    );
    return;
  }

  // Default: network-first with dynamic cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = { title: 'CoachKu', body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'CoachKu', {
      body: data.body || 'Ada notifikasi baru untuk Anda',
      icon: '/icons/android/launchericon-192x192.png',
      badge: '/icons/android/launchericon-192x192.png',
      tag: data.tag || 'coachku-notification',
      data: data,
    })
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
