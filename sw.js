// service worker moment
// copied from https://developers.google.com/web/fundamentals/primers/service-workers

var CACHE_NAME = 'schedule-personalizer-v2';
var urlsToCache = [
    '/schedule-personalizer',
    '/schedule-personalizer/style.css',
    '/schedule-personalizer/script.min.js',
    '/schedule-personalizer/darkmode.min.css'
];


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
            console.log('Network request for ', event.request.url);
            return fetch(event.request).then(response => {
                /* TODO 5 - Respond with custom 404 page */
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            }).catch(error => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.error("Oh crap, we are offline without any cache")
                return new Response("<strong> Offline </strong>")
            });

        }).catch(error => {
            console.error(error)
        }));
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
