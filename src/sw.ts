import { precacheAndRoute } from 'workbox-precaching';
import { setCacheNameDetails } from 'workbox-core';

type preCacheManifestEntry = {
    url: string;
    revision: string
}

setCacheNameDetails({
    prefix: "schedule-personalizer",
    suffix: "v5"
})

// @ts-expect-error cringe
const manifest: preCacheManifestEntry[] = self.__precacheManifest

precacheAndRoute(manifest); // yoo caching

self.addEventListener('message', (event) => {   
    const msg = event.data;
    console.log("SW Received Message: " + msg);
        if (msg === 'clearCache') {
            console.log('Clearing Workbox Cache.');
            refreshCacheAndReload();
    }
});
const registration = new ServiceWorkerRegistration();
const refreshCacheAndReload = () => {
    if ('serviceWorker' in navigator) {
      registration.unregister();
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      }).then(() => {
        registration.update();
      })
    }
    console.log('serviceWorker' in navigator)
    setTimeout(function () { window.location.replace(""); }, 300)
}