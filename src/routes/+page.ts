import { waitForMasterSettings } from '$lib/waitFor';
import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    if (!window && !localStorage) {
        throw error(500, 'Tried to server render page.ts');
    }
    await waitForMasterSettings();
    if (localStorage.getItem('setup-complete') != 'true') {
        throw redirect(300, '/setup');
    }
    //throw error(404, 'Not found');
}) satisfies PageLoad;
