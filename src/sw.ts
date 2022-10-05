/*import { precacheAndRoute, PrecacheEntry, addPlugins } from "workbox-precaching";*/
import { clientsClaim } from "workbox-core";
import { version } from '@parcel/service-worker';
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import {registerRoute} from 'workbox-routing';
import {CacheFirst, NetworkFirst} from 'workbox-strategies';
//import { ExpirationPlugin }  from "workbox-expiration";
//import { request } from "http";
import {CacheableResponsePlugin} from 'workbox-cacheable-response'

self.addEventListener("install", () => {
    self.skipWaiting().then(clientsClaim);
    console.log("oh shit guess who it fuckin is, its the gamer service worker here with offline support. ("+version+")")
})
self.addEventListener("activate", () => {
    caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
            if (cacheName.split("$")[1] != version) {
                console.log("deleting old cache "+cacheName)
                caches.delete(cacheName);
            }
        });
      });
})

const toNetwork = [
    "document",
    "manifest"
]

const opt = {
    plugins: [new BackgroundSyncPlugin("syncy"), new CacheableResponsePlugin({statuses: [0, 200]}),],
    "cacheName": "schedulecache$"+version+"$"
}
registerRoute((r) => toNetwork.includes(r.request.destination), new NetworkFirst(opt))
registerRoute((r) => !toNetwork.includes(r.request.destination)&&new URL(r.request.url).origin==location.origin,  new CacheFirst(opt))


/*const precacheList: PrecacheEntry[] = []

const hashRegex = /.+\.(.+)\..+/

const versioned = [
    "/",
    "/index.html",
    "/pwa/manifest.webmanifest",
    "/test/index.html",
    "/editor/index.html",
] // these use the global version and not a specific one

manifest.forEach((entry: string) => {
    if (versioned.includes(entry)) { 
        precacheList.push({
            url: entry,
            revision: version
        })
        //console.log("precached global", entry, version)
    } else {
        if (hashRegex.test(entry)) {
            const hashe = entry.match(hashRegex)
            //console.log(hashe)
            if (hashe == null) {
                throw new Error("hashRegex failed")
            }
            const hash = hashe[1]
            precacheList.push({
                url: entry,
                revision: hash
            })
            //console.log("precached " + entry + " with hash " + hash)
        } else {
            precacheList.push({
                url: entry,
                revision: null
            })
            //console.log("precached " + entry + " with no hash")
        }
    }
})
setCacheNameDetails({
    prefix: "schedule-personalizer",
    suffix: "v5",
});

addPlugins([
    new BackgroundSyncPlugin("background-sync")
])

precacheAndRoute(precacheList); */// yoo caching
/*
self.addEventListener("message", (event) => {
    const msg = event.data;
    console.log("SW Received Message: " + msg);
    if (msg === "clearCache") {
        console.log("Clearing Workbox Cache.");
        if ("serviceWorker" in navigator) {
            caches
                .keys()
                .then((cacheNames) => {
                    cacheNames.forEach((cacheName) => {
                        caches.delete(cacheName);
                    });
                })
                .then(() => {
                    //new ServiceWorkerRegistration().unregister();
                    window.location.reload();
                });
        }
        window.location.reload();
    }
});
*/
