import { RootState } from "./store"
import { deserify } from "@karmaniverous/serify-deserify"
import { StudentVueAPIData as schTypes } from "../studentVueAPI"
export type StvDataStorage = {
    info: any | null, // i beg of you, create types for these, i beg
    sch: schTypes | null,
    isVue: boolean,
}

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState: StvDataStorage = {
    info: null,
    sch: null,
    isVue: false,
}

export const stvSlice = createSlice({
  name: 'stv',
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<any>) {
        state['info'] = action.payload
    },
    setSch(state, action: PayloadAction<schTypes>) {
        state['sch'] = action.payload
    },
    enableSTV(state) {
        state['isVue'] = true
    },
    disableSTV(state) {
        state['isVue'] = false
    },
    reset: () => {
        return initialState
    }
  },
})

export function useSTV(): StvDataStorage  {
    return deserify(useSelector((state: RootState) => state.stv))
}

// Action creators are generated for each case reducer function
export const { reset, setInfo, setSch, enableSTV, disableSTV } = stvSlice.actions

export default stvSlice.reducer
