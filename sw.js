/* MMHTMLREP Service Worker
   AUTO VERSION BUMPING ENABLED
   Generated: 7/5/2026 4:49:43 PM
*/

const CACHE_VERSION = 'v20260705164943';
const CACHE_NAME = `mmhtml-cache-${CACHE_VERSION}`;

const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png',
  './images/splash.png',
  './images/silhouette.png'
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
        keys
          .filter(key => key.startsWith('mmhtml-cache-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
