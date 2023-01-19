import { sveltekit } from '@sveltejs/kit/vite';
import {resolve} from "path"
import { SvelteKitPWA } from '@vite-pwa/sveltekit'
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), SvelteKitPWA()],
	resolve: {
		alias: {
			"stream": "stream-browserify",
			"$types": resolve("./src/types.ts")
		}
	}
};

export default config;
