import { precacheAndRoute } from 'workbox-precaching';

type preCacheManifestEntry = {
    url: string;
    revision: string
}

// @ts-expect-error cringe
const manifest: preCacheManifestEntry[] = self.__precacheManifest

precacheAndRoute(manifest); // yoo fucking caching