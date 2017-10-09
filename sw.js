importScripts('/cache-polyfill.js');

var cacheName = "coverlinkCalculator-2";
var filesToCache = [
    '/',
    '/index.html',
    '/savings.html',
    '/css/bootstrap.css',
    '/css/main.css',
    '/css/normalize.css',
    '/css/style.css',
    '/img/logo-png.png',
    '/js/general.js',
    '/js/jquery.flot.js',
    '/js/jquery.flot.resize.js',
    '/js/main.js',
    '/js/plugins.js',
    '/js/libs/bootstrap.min.js',
    '/js/vendor/modernizr-3.5.0.min.js'
];

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(cacheName).then(function(cache) {
     return cache.addAll(filesToCache);
   })
 );
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
