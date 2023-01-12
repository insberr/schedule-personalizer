import { masterSettings } from '$lib/store';
import { waitForMasterSettings } from '$lib/waitFor';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    await waitForMasterSettings();
    return {};
}) satisfies LayoutLoad;
