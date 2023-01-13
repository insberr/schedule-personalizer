export const prerender = true;
export const ssr = false;
import { waitForMasterSettings } from '$lib/waitFor';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    await waitForMasterSettings();
    return {};
}) satisfies LayoutLoad;
