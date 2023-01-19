import { derived, writable } from 'svelte/store';
import { schedule } from '$lib/store/schedule';
import { scheduleConfig, schoolSettings } from '$lib/store/masterSettings';
//import Textbox from '$lib/components/Textbox.svelte';
import { DeCOH } from '$lib/DeCOH';

export const displayDate = writable(new Date());

export const hydrated = derived(
    [displayDate, scheduleConfig, schoolSettings, schedule],
    (vals) => {
        if (vals.some((v) => v === undefined)) return undefined;
        return DeCOH(...vals);
    }
);
