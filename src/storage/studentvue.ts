
export type StorageDataStudentvue = {
  password: string
  username: string
  stayLoggedIn: boolean
  isLoggedIn: boolean
  gotSchedules: boolean
  lastRefresh: number
};

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: StorageDataStudentvue = {
    password: '',
    username: '',
    stayLoggedIn: false,
    isLoggedIn: false,
    gotSchedules: false,
    lastRefresh: 0,
}

export const studentVueSlice = createSlice({
  name: 'studentvue',
  initialState,
  reducers: {
    setStudentVueData: (state, action: PayloadAction<StorageDataStudentvue>) => {
      state.password = action.payload.password
      state.username = action.payload.username
      state.stayLoggedIn = action.payload.stayLoggedIn
      state.isLoggedIn = action.payload.isLoggedIn
      state.gotSchedules = action.payload.gotSchedules
      state.lastRefresh = action.payload.lastRefresh
    },
    setUsernameAndPassword: (state, action: PayloadAction<{username: string, password: string}>) => {
      state.username = action.payload.username
      state.password = action.payload.password
    },
    setGotSchedules: (state, action: PayloadAction<boolean>) => {
        state.gotSchedules = action.payload
    },
    setLastRefresh: (state, action: PayloadAction<number>) => {
        state.lastRefresh = action.payload
    },
    reset: () => {
      return initialState
  }
  },
})

// begin hook
import { useSelector } from 'react-redux'
import { RootState } from "./store"
export function useStudentvue(): StorageDataStudentvue {
  return useSelector((state: RootState) => state.studentvue)
}
// end hook


// Action creators are generated for each case reducer function
export const { setStudentVueData, setUsernameAndPassword, setGotSchedules, setLastRefresh, reset } = studentVueSlice.actions

export default studentVueSlice.reducer

