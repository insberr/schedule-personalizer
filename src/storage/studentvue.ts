import { signal } from '@preact/signals-react';
import { persist } from './persistSignal';

// perhaps find redux data first?
const initialCredentialsState = {
    username: '',
    password: '',
};

export const studentVueCredentials = persist('studentVueCredentials', initialCredentialsState);
export const isStudentVue = persist('isStudentVue', false);
export const studentVueGotSchedules = persist('studentVueGotSchedules', false);

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

export const studentVueGrades = persist<StudentVueGradesStorage>('studentVueGrades', {
    grades: null,
});
