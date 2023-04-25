import { persist } from './persistSignal';
import { signal } from '@preact/signals';
import { isStudentVue, studentVueCredentials, studentVueGotSchedules } from './studentvue';
import { customizationCustomizations } from './customizations';
import { scheduleDataTerms } from './schedule';

export const setupComplete = persist<boolean>('setupComplete', false);
export const rgbParty = signal<boolean>(false);
export const presentationMode = persist<boolean>('presentationMode', false);

// Find redux storage and save customizations, studentvue credentials, and manual schedule/terms
// const reduxStorage = JSON.parse(localStorage.getItem('persist:v5ReduxData') || '{}');
// console.log(reduxStorage);
// if (reduxStorage.misc) {
//     const misc = JSON.parse(reduxStorage.misc);
//     if (misc.setupComplete) setupComplete.value = misc.setupComplete;
//     if (misc.presentationMode) presentationMode.value = misc.presentationMode;
// }
// if (reduxStorage.studentvue) {
//     const studentvue = JSON.parse(reduxStorage.studentvue);
//     if (studentvue.password && studentvue.username) studentVueCredentials.value = { password: studentvue.password, username: studentvue.username };
//     if (studentvue.gotSchedules) studentVueGotSchedules.value = studentvue.gotSchedules;
// }
// if (reduxStorage.stv) {
//     const stv = JSON.parse(reduxStorage.stv);
//     if (stv.isVue) isStudentVue.value = stv.isVue;
// }
// if (reduxStorage.customization) {
//     const customization = JSON.parse(reduxStorage.customization);
//     customizationCustomizations.value = customization;
// }
// if (reduxStorage.schedule) {
//     const schedule = JSON.parse(reduxStorage.schedule);
//     console.log(schedule.terms);
//     scheduleDataTerms.value = schedule.terms;
// }

/*
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const initialState: Misc = {
    setupComplete: false,
    rgbParty: false,
    presentationMode: false,
};

export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
        setSetupComplete: (state, action: PayloadAction<boolean>) => {
            state.setupComplete = action.payload;
        },
        setRgbParty: (state, action: PayloadAction<boolean>) => {
            state.rgbParty = action.payload;
        },
        setPresentationMode: (state, action: PayloadAction<boolean>) => {
            state.presentationMode = action.payload;
        },
        reset: () => {
            return initialState;
        },
    },
});

export function useMisc(): Misc {
    return useSelector((state: RootState) => state.misc);
}
// Action creators are generated for each case reducer function
export const { setSetupComplete, reset, setRgbParty, setPresentationMode } = miscSlice.actions;

export default miscSlice.reducer;
*/
