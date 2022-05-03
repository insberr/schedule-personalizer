import { precacheAndRoute } from 'workbox-precaching';
import {setCacheNameDetails} from 'workbox-core';

type preCacheManifestEntry = {
    url: string;
    revision: string
}

setCacheNameDetails({
    prefix: "schedule-personalizer",
    suffix: "v2"
})

// @ts-expect-error cringe
const manifest: preCacheManifestEntry[] = self.__precacheManifest

precacheAndRoute(manifest); // yoo fucking caching