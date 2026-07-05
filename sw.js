/* MMHTMLREP Service Worker
   AUTO VERSION BUMPING ENABLED
   Generated: 7/5/2026 3:49:54 PM
*/

const CACHE_VERSION = 'v20260705154954';
const CACHE_NAME = `mmhtml-cache-${CACHE_VERSION}`;

const ASSETS = [
  './index.html',
  './manifest.json',
  './images/splash.png',
  './images/silhouette.png'
];

// Install: cache all required assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate: delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('mmhtml-cache-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
