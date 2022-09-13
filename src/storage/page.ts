export enum Page {
  SCHEDULE,
  SETTINGS,
  SETUP,
  EDITOR
}

export type PageStorage = {

    currentPage: Page
  };
  
  import { createSlice } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'
  
  const initialState: PageStorage = {
      currentPage: Page.SCHEDULE
  }
  
  export const routeSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
      route: (state, action: PayloadAction<Page>) => {
        state.currentPage = action.payload;
      },
      reset: () => {
        return initialState
    }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { route, reset } = routeSlice.actions
  
  export default routeSlice.reducer
  