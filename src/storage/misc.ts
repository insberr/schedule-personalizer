import {persist} from "./persistSignal";
import {signal} from "@preact/signals-react"

export const setupComplete = persist<boolean>("setupComplete", false);
export const rgbParty = signal<boolean>(false);
export const presentationMode = persist<boolean>("presentationMode", false);


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

