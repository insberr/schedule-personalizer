import { waitForMasterSettings } from '$lib/waitFor';
import type { PageLoad } from './$types';

export const load = (() => waitForMasterSettings()) satisfies PageLoad;
