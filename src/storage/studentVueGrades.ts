import { RootState } from './store';
import { deserify } from '@karmaniverous/serify-deserify';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Gradebook } from 'studentvue';

export type FormattedGradebook = {
    terms: {
        // each term
        [key: number]: {
            // each period
            [key: number]: {
                title: string;
                string: string;
                raw: number;
            };
        };
    };
};

export type StudentVueGradesStorage = {
    grades: FormattedGradebook | null;
};

const initialState: StudentVueGradesStorage = {
    grades: null,
};

export const studentVueGradesSlice = createSlice({
    name: 'studentVueGrades',
    initialState,
    reducers: {
        setGrades(state, action: PayloadAction<FormattedGradebook>) {
            state['grades'] = action.payload;
        },
        reset: () => {
            return initialState;
        },
    },
});

export function useGrades(): StudentVueGradesStorage {
    return deserify(useSelector((state: RootState) => state.studentVueGrades));
}

// Action creators are generated for each case reducer function
export const { reset, setGrades } = studentVueGradesSlice.actions;

export default studentVueGradesSlice.reducer;

