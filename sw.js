
const CACHE_VERSION = '20260729180221';
const CACHE_NAME = 'stoner-cache-' + CACHE_VERSION;

const ASSETS = [
  'index.html',
  'style.css',
  'manifest.json',
  'images/splash.png',
  'images/silhouette.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE_NAME && k.startsWith('stoner-cache-')) {
            return caches.delete(k);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
