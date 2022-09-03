import { precacheAndRoute } from "workbox-precaching";
import { setCacheNameDetails } from "workbox-core";

type preCacheManifestEntry = {
    url: string;
    revision: string;
};

setCacheNameDetails({
    prefix: "schedule-personalizer",
    suffix: "v5",
});

// @ts-expect-error cringe
const manifest: preCacheManifestEntry[] = self.__precacheManifest;

precacheAndRoute(manifest); // yoo caching
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
                    window.location.reload();
                });
        }
        window.location.reload();
    }
});
*/