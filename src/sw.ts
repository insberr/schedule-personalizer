import { precacheAndRoute } from 'workbox-precaching';

type preCacheManifestEntry = {
    url: string;
    revision: string
}

// @ts-ignore
const manifest: preCacheManifestEntry[] = self.__precacheManifest

precacheAndRoute(manifest); // yoo fucking caching