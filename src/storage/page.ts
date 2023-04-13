export enum Page {
    SCHEDULE,
    SETTINGS,
    SETUP,
    EDITOR,
    PATHOFPAIN,
    EDITMANUALLY,
    STUDENTID,
    SCHOOL,
    BETA,
    LOGIN,
    SCHEDULE2,
}

// to do: make this an object and not 2 functions;
export function findDefaultRoute(): Page {
    switch (window.location.search) {
        case '?editor':
            return Page.EDITOR;
        case '?setup':
            return Page.SETUP;
        case '?settings':
            return Page.SETTINGS;
        case '':
            return Page.SCHEDULE;
        case '?pain':
            return Page.PATHOFPAIN;
        case '?editManual':
            return Page.EDITMANUALLY;
        case '?studentID':
            return Page.STUDENTID;
        case '?school':
            return Page.SCHOOL;
        case '?beta':
            return Page.BETA;
        case '?login':
            return Page.LOGIN;
        default:
            return Page.SCHEDULE;
    }
}
export function page2url(p: Page): string {
    switch (p) {
        case Page.EDITOR:
            return './?editor';
        case Page.SETTINGS:
            return './?settings';
        case Page.SCHEDULE:
            return './';
        case Page.SETUP:
            return './?setup';
        case Page.PATHOFPAIN:
            return './?pain';
        case Page.EDITMANUALLY:
            return './?editManual';
        case Page.STUDENTID:
            return './?studentID';
        case Page.SCHOOL:
            return './?school';
        case Page.BETA:
            return './?beta';
        case Page.LOGIN:
            return './?login';
        default:
            return './';
    }
}

export type PageStorage = {
    currentPage: Page;
};

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: PageStorage = {
    currentPage: findDefaultRoute(),
};

export const routeSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
        route: (state, action: PayloadAction<Page>) => {
            state.currentPage = action.payload;
        },
        reset: () => {
            return initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const { route, reset } = routeSlice.actions;

export default routeSlice.reducer;
