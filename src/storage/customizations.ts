import type { Customizations, ClassIDS, RGBA, Colors } from "../types";
import { defaultCustomizations as initialState } from "../config/settings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export const customizationSlice = createSlice({
    name: "customization",
    initialState,
    reducers: {
        setShowInfoOnSchedule: (state, action: PayloadAction<boolean>) => {
            state.showInfoOnSchedule = action.payload;
        },
        setCustomizations: (state, action: PayloadAction<Customizations>) => {
            return {...state, ...action.payload};
        },
        setScheduleColor: (state, action: PayloadAction<{sch: ClassIDS, color: RGBA}>) => {
            state.theme.colors.schedule[action.payload.sch] = action.payload.color;
        },
        setAllColors: (state, action: PayloadAction<Colors>) => {
            state.theme.colors = action.payload;
        },
        setCurrentClassColor: (state, action: PayloadAction<RGBA>) => {
            state.theme.colors.currentClass = action.payload;
        },
        setKeybindings: (state, action: PayloadAction<{[key: string]: string}>) => {
            state.keybinds = {...state.keybinds, ...action.payload};
        },
        resetColors: (state) => {
            state.theme.colors = initialState.theme.colors;
        },
        reset: () => {
            return initialState;
        },
    },
});

export function useCustomizations(): Customizations {
    return useSelector((state: RootState) => state.customization);
}

// Action creators are generated for each case reducer function
export const { reset, setShowInfoOnSchedule, setCustomizations, setScheduleColor, setCurrentClassColor, setKeybindings, resetColors, setAllColors } = customizationSlice.actions;

export default customizationSlice.reducer;
