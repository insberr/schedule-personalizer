import { sveltekit } from '@sveltejs/kit/vite';
import {resolve} from "path"
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			"stream": "stream-browserify",
			"$types": resolve("./src/types.ts")
		}
	}
};

export default config;
