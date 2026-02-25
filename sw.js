const CACHE_NAME = 'v2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './birdshooting/birdshootinggame.html',
        './bitlife/bitlife.html',
        './boardshooter/boardshooter.html',
        './spiders/spiders.html',
        './tictactoe/tictactoegame.html',
        './bulbsimulation/bulbsimulation.html',
        './hackedwindow/hackedwindow.html',
        './laserplaneshoot/laserplaneshoot.html',
        './pingpong/pingpong.html',
        './rotatingwheelgame/rotatingwheelgame.html'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
