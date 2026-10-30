const CACHE_NAME = 'v2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './archeryarena/archeryarena.html',
        './birdshootinggame/birdshootinggame.html',
        './bitlife/bitlife.html',
        './boardshooter/boardshooter.html',
        './bulbsimulation/bulbsimulation.html',
        './bunnyhome/bunnyhome.html',
        './excitonium/excitonium.html',
        './fortcapture/fortcapture.html',
        './hackedwindow/hackedwindow.html',
        './laserplaneshoot/laserplaneshoot.html',
        './peeonthehole/peeonthehole.html',
        './pingpong/pingpong.html',
        './rainsimulationgame/rainsimulationgame.html',
        './rotatingwheelgame/rotatingwheelgame.html',
        './spiders/spiders.html',
        './tictactoegame/tictactoegame.html',
        './vaultbreach/vaultbreach.html'
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
