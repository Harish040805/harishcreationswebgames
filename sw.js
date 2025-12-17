const CACHE_NAME = 'hc-webgames-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
  './index.html',
  './birdshootinggame.html',
  './bitlife.html',
  './boardshooter.html',
  './spiders.html',
  './tictactoegame.html'
  './archerymastergame.html'
  './bulbsimulation.html'
      './hackedwindow.html'
      './laserplaneshoot.html'
      './pingpong.html'
      './rotatingwheelgame.html'
      './tictactoegame.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
