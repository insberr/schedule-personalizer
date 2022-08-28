import { configureStore, combineReducers } from '@reduxjs/toolkit'
import scheduleReducer, {reset as resetSchedule} from './schedule';
import studentvueReducer, {reset as resetStudentvue} from './studentvue';
import miscReducer, {reset as resetMisc} from './misc';
import stvReducer, {reset as resetStv} from './studentvueData';
import customReducer, {reset as resetCustom} from './customizations';
import { createReduxMiddleware } from "@karmaniverous/serify-deserify"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createMigrate } from 'redux-persist';
// I left off here, trying to implement terms now. shouldve done that from the beginning
// Also adding the storage manager to the rest of the code

export enum StorageQuery {
    All,
    Init,
    Setup,
    Terms,
    Lunch,
    Studentvue,
    Customizations,
    Dev
}

export type StorageDataLunch = {
    lunch: number
};
export type StorageDataStudentvue = {
    password: string
    username: string
    stayLoggedIn: boolean
    isLoggedIn: boolean
};
export type StorageDataCustomizations = {
    colors?: {
        currentClass?: string
        zeroHour?: string
        lunch?: string
        normalClass?: string
        dismissal?: string
        arrival?: string
        background?: string
    }
};
export type SetUpComplete = boolean;

export type StorageData = {
    //terms: StorageDataTerms
    lunch: StorageDataLunch
    studentVue: StorageDataStudentvue
    customizations: StorageDataCustomizations
    setUpComplete: boolean
}

const migrations = {
    0: (state: any) => {
        return {...state, misc: { setUpComplete: false, rgbParty: false } } //ok
    }
}



const persistConfig = {
    key: 'v5ReduxData',
    version: 0,
    storage,
    blacklist: [],
    migrate: createMigrate(migrations, { debug: process.env.NODE_ENV !== 'production' }),
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    schedule: scheduleReducer,
    studentvue: studentvueReducer,
    misc: miscReducer,
    stv: stvReducer,
    customization: customReducer
}))


export const store = configureStore({
  reducer: persistedReducer,
  devTools: (process.env.NODE_ENV !== 'production'),
  middleware: (gDM) => gDM({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(createReduxMiddleware()),
})
export const persistor = persistStore(store)


export const resetStorage = () => { 
    persistor.purge().then(() => {
        store.dispatch(resetSchedule())
        store.dispatch(resetStudentvue())
        store.dispatch(resetMisc())
        store.dispatch(resetStv())
        store.dispatch(resetCustom())
    })
    
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
