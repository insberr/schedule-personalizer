import type { Terms, Term } from "../types"
import { RootState } from "./store"
import { deserify } from "@karmaniverous/serify-deserify"
export type ScheduleStorage = {
    terms: Terms,
    lunch: number
}

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState: ScheduleStorage = {
    lunch: 0,
    terms: []
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setTerm: (state, action: PayloadAction<{ id: number, class: Term}>) => {
        state.terms[action.payload.id] = action.payload.class
    },
    setTerms: (state, action: PayloadAction<Terms>) => {
        state.terms = action.payload
    },
    setLunch: (state, action: PayloadAction<number>) => {
        state.lunch = action.payload
    },
    reset: () => {
        return initialState
    }
  },
})

export function useSchedule(): ScheduleStorage  {
    return deserify(useSelector((state: RootState) => state.schedule))
}

// Action creators are generated for each case reducer function
export const { setTerm, setTerms, setLunch, reset } = scheduleSlice.actions

export default scheduleSlice.reducer
