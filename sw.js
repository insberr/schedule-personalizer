// service worker moment
// copied from https://developers.google.com/web/fundamentals/primers/service-workers

var CACHE_NAME = 'schedule-personalizer';
var urlsToCache = [
    '/schedule-personalizer',
    '/schedule-personalizer/style.css',
    '/schedule-personalizer/script.js',
    '/schedule-personalizer/darkmode.css'
];

function updateCacheName() {
    const updateCacheNamePromise = new Promise((resolve, reject) => {
        fetch('https://api.github.com/repos/insberr/schedule-personalizer/commits/master')
            .then(response => response.json())
            .then(data => {
                console.log(data.sha)
                resolve("schpersonal-" + data.sha);
            })
            .catch(err => {
                // check for a local sha hash
                db = indexedDB.open("schpersonal")
                resolve("error-cache") // TODO: Actually do this
            });
    });
    return updateCacheNamePromise
}

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            console.log('Network request for ', event.request.url);
            return fetch(event.request).then(response => {
                // TODO 5 - Respond with custom 404 page
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            });

        }).catch(error => {

            // TODO 6 - Respond with custom offline page

        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheAllowlist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheAllowlist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});