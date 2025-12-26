
const CACHE_NAME = 'bajada-segura-v1.1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  'https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/logo_bajada.png',
  'https://raw.githubusercontent.com/extresado/App_apoyo_chemsex/refs/heads/main/cohete.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Para una SPA, si no encuentra el recurso, sirve el index.html
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
