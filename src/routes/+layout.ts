export const prerender = true;
export const ssr = false;
import { masterSettings } from '$lib/store/masterSettings';
import { waitForMasterSettings } from '$lib/waitFor';
import { MasterSettingsSchema } from '$types';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load = (async () => {
    await waitForMasterSettings();
    if (!MasterSettingsSchema.isValid(get(masterSettings))) {
        throw error(500, 'Master Configuration File is Invalid!');
    }
    return {};
}) satisfies LayoutLoad;
