import { Terms, Term, CL, emptyCL } from '../types';
import { RootState } from './store';
import { serify, deserify } from '@karmaniverous/serify-deserify';
import * as settings from '../config/settings';

export type ScheduleStorage = {
    terms: Terms;
    lunch: number;
};

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState: ScheduleStorage = {
    lunch: 1,
    terms: serify(
        settings.termsDates.map((t) => {
            t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
            return t;
        })
    ),
};

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setTerm: (state, action: PayloadAction<{ id: number; class: Term }>) => {
            state.terms[action.payload.id] = action.payload.class;
        },
        setTermClasses: (state, action: PayloadAction<{ id: number; classes: CL[] }>) => {
            state.terms[action.payload.id] = {
                ...state.terms[action.payload.id],
                classes: action.payload.classes,
            };
        },
        setTerms: (state, action: PayloadAction<Terms>) => {
            state.terms = action.payload;
        },
        setLunch: (state, action: PayloadAction<number>) => {
            state.lunch = action.payload;
        },
        setSchedule: (state, action: PayloadAction<ScheduleStorage>) => {
            return { ...action.payload };
        },
        reset: () => {
            return initialState;
        },
    },
});

export function useSchedule(): ScheduleStorage {
    return deserify(useSelector((state: RootState) => state.schedule));
}

// Action creators are generated for each case reducer function
export const { setTerm, setTerms, setLunch, reset, setSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
