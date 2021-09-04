// service worker moment
// copied from https://developers.google.com/web/fundamentals/primers/service-workers

var CACHE_NAME = 'schedule-personalizer-v1';
var urlsToCache = [
    '/schedule-personalizer',
    '/schedule-personalizer/style.css',
    '/schedule-personalizer/script.min.js',
    '/schedule-personalizer/darkmode.min.css',
		'/schedule-personalizer/splashscreens/apple-splash-2048-2732.png',
		'/schedule-personalizer/splashscreens/apple-splash-2732-2048.png',
		'/schedule-personalizer/splashscreens/apple-splash-1668-2388.png',
		'/schedule-personalizer/splashscreens/apple-splash-2388-1668.png',
		'/schedule-personalizer/splashscreens/apple-splash-1536-2048.png',
		'/schedule-personalizer/splashscreens/apple-splash-2048-1536.png',
		'/schedule-personalizer/splashscreens/apple-splash-1668-2224.png',
		'/schedule-personalizer/splashscreens/apple-splash-2224-1668.png',
		'/schedule-personalizer/splashscreens/apple-splash-1620-2160.png',
		'/schedule-personalizer/splashscreens/apple-splash-2160-1620.png',
		'/schedule-personalizer/splashscreens/apple-splash-1284-2778.png',
		'/schedule-personalizer/splashscreens/apple-splash-2778-1284.png',
		'/schedule-personalizer/splashscreens/apple-splash-1170-2532.png',
		'/schedule-personalizer/splashscreens/apple-splash-2532-1170.png',
		'/schedule-personalizer/splashscreens/apple-splash-1125-2436.png',
		'/schedule-personalizer/splashscreens/apple-splash-2436-1125.png',
		'/schedule-personalizer/splashscreens/apple-splash-1242-2688.png',
		'/schedule-personalizer/splashscreens/apple-splash-2688-1242.png',
		'/schedule-personalizer/splashscreens/apple-splash-828-1792.png',
		'/schedule-personalizer/splashscreens/apple-splash-1792-828.png',
		'/schedule-personalizer/splashscreens/apple-splash-1242-2208.png',
		'/schedule-personalizer/splashscreens/apple-splash-2208-1242.png',
		'/schedule-personalizer/splashscreens/apple-splash-750-1334.png',
		'/schedule-personalizer/splashscreens/apple-splash-1334-750.png',
		'/schedule-personalizer/splashscreens/apple-splash-640-1136.png',
		'/schedule-personalizer/splashscreens/apple-splash-1136-640.png',
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
