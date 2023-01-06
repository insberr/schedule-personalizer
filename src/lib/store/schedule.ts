import type { Term, Terms } from '$types';
import { derived } from 'svelte/store';
import { manualTerms } from './manual';
import { convertedSTVSchedule, isStudentvue } from './studentvue';

export const schedule = derived(
    [isStudentvue, convertedSTVSchedule, manualTerms],
    ([isSTV, STV, man]) => {
        if (isSTV) {
            return STV as Terms;
        }
        return man;
    }
);
