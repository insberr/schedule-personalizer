import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from ".";

export interface Vmode {
  theme: "dark" | "light";
}

const initialState: Vmode = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    dark(state) {
      state.theme = "dark";
    },
    light(state) {
      state.theme = "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { dark, light } = themeSlice.actions;

export function useTheme(): "dark" | "light" {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return theme;
}

export default themeSlice.reducer;
