
const CACHE = 'sanlan-cache-20260707065755';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      return c.addAll([
        './index.html?rel=20260707065755',
        './manifest.json?rel=20260707065755',
        './sanleandro-icon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
