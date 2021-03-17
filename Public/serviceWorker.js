self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open('schedule').then(function (cache) {
			return cache.addAll([
				"/",
				"/index.html",
				"/script.js",
				"/style.css",
				"/schedule.png"
			]);
		})
	);
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});