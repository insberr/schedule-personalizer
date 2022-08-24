import { CL } from '../types';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import scheduleReducer, {reset as resetSchedule} from './schedule';
import studentvueReducer, {reset as resetStudentvue} from './studentvue';
import miscReducer, {reset as resetMisc} from './misc';
import stvReducer, {reset as resetStv} from './studentvueData';
import { createReduxMiddleware } from "@karmaniverous/serify-deserify"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
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

const persistConfig = {
    key: 'v5ReduxData',
    version: 5,
    storage,
    blacklist: []
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    schedule: scheduleReducer,
    studentvue: studentvueReducer,
    misc: miscReducer,
    stv: stvReducer,
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
    })
    
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

/*
export function getV1Data(): string | null {
    return localStorage.getItem('data') || null
}

export function getV5Data(query: StorageQuery): StorageDataTypes {
    const v5Data: StorageData = JSON.parse(localStorage.getItem('v5Data-v1') || JSON.stringify(setV5Data(StorageQuery.Init, {})));
    
    if (query === StorageQuery.All) {
        return v5Data;
    }
    
    if (query === StorageQuery.Init) {
        throw Error('You shouldnt be using that query on this function, dunno what youre thinking dumb dumb');
    }

    if (query === StorageQuery.Dev) {
        return JSON.parse(localStorage.getItem('dev') || "{}")
    }

    switch(query) {
        case StorageQuery.Terms:
            return v5Data.terms;
        case StorageQuery.Lunch:
            return v5Data.lunch;
        case StorageQuery.Studentvue:
            return v5Data.studentVue;
        case StorageQuery.Customizations:
            return v5Data.customizations;
        case StorageQuery.Setup:
            return v5Data.setUpComplete;
        default:
            throw Error('That query doesnt exist, How TF did that not happen');
    }

}

export function setV5Data(query: StorageQuery, data: StorageDataTypes): StorageData {
    console.log("set: " + JSON.stringify(data));

    if (query === StorageQuery.Init) {
        if (localStorage.getItem('v5Data-v1') !== null) return getV5Data(StorageQuery.All) as StorageData; //actually set data
        localStorage.setItem('v5Data-v1', JSON.stringify({
            terms: [{termIndex: 1, classes: [], startDate: new Date(), endDate: new Date()}, {termIndex: 2, classes: [], startDate: new Date(), endDate: new Date()}, { termIndex: 3, classes: [], startDate: new Date(), endDate: new Date()}],
            lunch: { lunch: 1 },
            setUpComplete: false,
            studentVue: { password: '', username: '', stayLoggedIn: false, isLoggedIn: false },
            customizations: { }
        }));
        return getV5Data(StorageQuery.All) as StorageData; //actually set data
    }

    if (query === StorageQuery.All) {
        localStorage.setItem('v5Data-v1', JSON.stringify(data));
        return getV5Data(StorageQuery.All) as StorageData;
    }

    const v5Data: StorageData = getV5Data(StorageQuery.All) as StorageData;

    switch(query) {
        case StorageQuery.Terms:
            v5Data.terms = data as StorageDataTerms;
            break;
        case StorageQuery.Lunch:
            v5Data.lunch = data as StorageDataLunch;
            break;
        case StorageQuery.Studentvue:
            v5Data.studentVue = data as StorageDataStudentvue;
            break;
        case StorageQuery.Customizations:
            v5Data.customizations = data as StorageDataCustomizations;
            break;
        case StorageQuery.Setup:
            v5Data.setUpComplete = data as SetUpComplete;
            break;
        default:
            throw Error(`Invalid query ${query.toString()}, How TF did this happen??`);
    }

    localStorage.setItem('v5Data-v1', JSON.stringify(v5Data));
    return getV5Data(StorageQuery.All) as StorageData;

}

export function clearV5Data(): void {
    localStorage.removeItem('v5Data-v1');
}
*/
