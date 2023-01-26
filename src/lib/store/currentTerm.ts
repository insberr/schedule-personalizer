import { displayDate } from '$lib/store/displayDate';
import { isWithinInterval } from 'date-fns';
import { derived, type Readable } from 'svelte/store';
import { schoolSettings } from './masterSettings';

export const currentTermStore: Readable<number> = derived(
    [displayDate, schoolSettings],
    ([$displayDate, $schoolSettings]) => {
        if (!$schoolSettings) {
            return -1;
        }
        let currentTerm = $schoolSettings.terms.findIndex((term) => {
            let start = new Date(term.start);
            let end = new Date(term.end);
            return isWithinInterval($displayDate, { start, end });
        });
        return currentTerm;
    }
);
