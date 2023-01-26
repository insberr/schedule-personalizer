import { derived, get, writable } from 'svelte/store';
import { schedule } from '$lib/store/schedule';
import { scheduleConfig, schoolSettings } from '$lib/store/masterSettings';
//import Textbox from '$lib/components/Textbox.svelte';
import { DeCOH } from '$lib/DeCOH';
import { isAfter, isSameDay } from 'date-fns';
import { displayDate } from '$lib/store/displayDate';
import { currentTermStore } from '$lib/store/currentTerm';

export const hydrated = derived(
    [displayDate, scheduleConfig, schoolSettings, schedule, currentTermStore],
    ([one, two, three, four]) => {
        if ([one, two, three, four].some((v) => v === undefined))
            return undefined;
        return DeCOH(one, two, three, four);
    }
);

function clampDate() {
    let d = get(displayDate);
    if (!get(schoolSettings)) return;
    let startDate = get(schoolSettings)
        .terms.map((r) => new Date(r.start))
        .sort((a, b) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    let endDate = get(schoolSettings)
        .terms.map((r) => new Date(r.end))
        .sort((b, a) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    if (isAfter(d, endDate)) displayDate.set(endDate);
    if (isAfter(startDate, d)) displayDate.set(startDate);
}

displayDate.subscribe((d) => {
    clampDate();
});

schoolSettings.subscribe((d) => clampDate());

//@ts-ignore
window.DD = displayDate;
