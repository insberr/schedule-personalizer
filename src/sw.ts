import { precacheAndRoute, PrecacheEntry } from "workbox-precaching";
import { setCacheNameDetails } from "workbox-core";
import {manifest, version} from '@parcel/service-worker';

const precacheList: PrecacheEntry[] = []

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


precacheAndRoute(precacheList); // yoo caching
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
