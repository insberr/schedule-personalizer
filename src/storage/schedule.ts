import { computed, signal } from '@preact/signals-react';
import { Terms } from '../types';
import * as settings from '../config/settings';
import { persist } from './persistSignal';
import { CL } from '../types';
export const manualSchedule = persist<CL[]>('manual', []);

export const displayDate = signal<Date>(new Date());
export const scheduleTerms = signal<Terms>(settings.termsDates);

export const displaySchedule = computed(() => {
    // this function will take the schedule (studentvue or manual) and create the displayDate's schedule
});
