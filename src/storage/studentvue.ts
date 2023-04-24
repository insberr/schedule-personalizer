import { effect } from '@preact/signals';
import { persist } from './persistSignal';
import * as Sentry from '@sentry/react';

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

effect(() => {
    if (isStudentVue.value || studentVueCredentials.value.username !== '') {
        Sentry.setUser({ id: studentVueCredentials.value.username });
    } else {
        Sentry.setUser(null);
    }
});
