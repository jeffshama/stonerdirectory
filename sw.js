const CACHE_VERSION = '20260826052108';
const CACHE_NAME = 'stoner-cache-' + CACHE_VERSION;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'manifest.json',
        'images/splash.png',
        'images/silhouette.png'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => !k.includes(CACHE_VERSION))
            .map(k => caches.delete(k))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
