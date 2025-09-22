var CACHE_NAME = 'timelapses-cache-v48';
var urlsToCache = [
    '.',
    'css/dark-theme-v003.css',
    'css/light-theme-v004.css',
    'css/main-v004.css',
    'css/normalize.css',
    'js/checkAncients.js',
    'js/main.js',
    'js/pako.min.js',
    'js/readSave.js'
];

self.addEventListener('install', function(event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.has(CACHE_NAME)
        .then(function(exists) {
            if (exists) return exists
            else throw 'Cache does not exist';
        })
        .catch(function(error) {
            return caches.open(CACHE_NAME).then(function(cache) {
                return cache.addAll(urlsToCache);
            });
        })
        .then(function(cache) {
            return caches.match(event.request);
        })
        .then(function(response) {
            if (response) return response
            else return fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        (async () => {
            await clients.claim();
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames
                    .filter(name => name.startsWith('timelapses-cache') && name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })()
    );
});