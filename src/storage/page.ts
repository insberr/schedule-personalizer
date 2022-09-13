export enum Page {
  SCHEDULE,
  SETTINGS,
  SETUP,
  EDITOR
}

function findDefaultRoute(): Page {
  switch (window.location.pathname) {
    case "/editor":
      return Page.EDITOR;
    default:
      return Page.SCHEDULE
  }
}

export type PageStorage = {

    currentPage: Page
  };
  
  import { createSlice } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'
  
  const initialState: PageStorage = {
      currentPage: findDefaultRoute()
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
  