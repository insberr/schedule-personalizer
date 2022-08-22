export type Misc = {
    setupComplete: boolean,
    rgbParty: boolean,
  };
  
  import { createSlice } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'
  
  const initialState: Misc = {
      setupComplete: false,
      rgbParty: false
  }
  
  export const miscSlice = createSlice({
    name: 'misc',
    initialState,
    reducers: {
      setSetupComplete: (state, action: PayloadAction<boolean>) => {
        state.setupComplete = action.payload
      },
      setRgbParty: (state, action: PayloadAction<boolean>) => {
        state.rgbParty = action.payload
      },
      reset: () => {
        return initialState
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setSetupComplete, reset, setRgbParty } = miscSlice.actions
  
  export default miscSlice.reducer
  