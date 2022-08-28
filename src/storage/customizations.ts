import type { Customizations } from "../types";
import { defaultCustomizations as initialState } from "../config/settings";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const customizationSlice = createSlice({
    name: "customization",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
    },
});
import { useSelector } from "react-redux";
import { RootState } from "./store";
export function useSchedule(): Customizations {
    return useSelector((state: RootState) => state.customization);
}

// Action creators are generated for each case reducer function
export const { reset } = customizationSlice.actions;

export default customizationSlice.reducer;
