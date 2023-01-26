import { schoolDateCount } from '$lib/DeCOH';
import { displayDate } from '$lib/store/displayDate';
import { isWithinInterval } from 'date-fns';
import { derived } from 'svelte/store';
import { currentTermStore } from './currentTerm';
import { scheduleConfig, schoolSettings } from './masterSettings';

const daysLeft = derived(
    [displayDate, scheduleConfig, schoolSettings, currentTermStore],
    ([$displayDate, $scheduleConfig, $schoolSettings, currentTerm]) => {
        let endOfYear = new Date(
            $schoolSettings.terms[$schoolSettings.terms.length - 1].end
        );
        if (currentTerm == undefined) {
            return {
                term: 0,
                year: schoolDateCount(
                    $displayDate,
                    endOfYear,
                    $scheduleConfig,
                    $schoolSettings
                ),
            };
        }
        let endOfTerm = new Date($schoolSettings.terms[currentTerm].end);

        return {
            term: schoolDateCount(
                $displayDate,
                endOfTerm,
                $scheduleConfig,
                $schoolSettings
            ),
            year: schoolDateCount(
                $displayDate,
                endOfYear,
                $scheduleConfig,
                $schoolSettings
            ),
        };
    }
);

export const daysLeftTerm = derived(daysLeft, ($daysLeft) => $daysLeft.term);
export const daysLeftYear = derived(daysLeft, ($daysLeft) => $daysLeft.year);

export default daysLeft;
