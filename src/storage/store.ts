import { configureStore, combineReducers } from '@reduxjs/toolkit'
import scheduleReducer, {reset as resetSchedule} from './schedule';
import studentvueReducer, {reset as resetStudentvue} from './studentvue';
import miscReducer, {reset as resetMisc} from './misc';
import stvReducer, {reset as resetStv} from './studentvueData';
import customReducer, {reset as resetCustom} from './customizations';
import pageReducer, {reset as resetPage} from "./page"
import { createReduxMiddleware } from "@karmaniverous/serify-deserify"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, createMigrate } from 'redux-persist';
import { defaultCustomizations, forSchoolName } from '../config/settings';
import { ClassIDS, RGBA } from '../types'
import { redactStructure } from '../lib/lib'

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
/* eslint-disable @typescript-eslint/no-explicit-any */
const migrations = {
    0: (state: any) => {
        return {...state, misc: { setUpComplete: false, rgbParty: false } } //ok
    },
    // added customizations
    1: (state: any) => {
        return {...state, customization: defaultCustomizations }
    },
    2: (state: any) => {
        console.log(state.customization);
        const colors = state.customization.theme.colors;
        console.log('colors: ', colors);
        for (const c of Object.entries<[string, RGBA]>(colors.schedule)) {
            console.log('c: ', c);
            const temp = colors.schedule[parseInt(c[0])]
            if (temp.c === undefined) {
                colors.schedule[parseInt(c[0])] = {
                    enabled: temp.enabled || false,
                    c: {
                        r: temp.r,
                        g: temp.g,
                        b: temp.b,
                        a: temp.a
                    },
                    t: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 0
                    }
                }
            }
        }

        if (colors.currentClass.c === undefined) {
            colors.currentClass = {
                enabled: colors.currentClass.enabled || false,
                c: {
                    r: colors.currentClass.r,
                    g: colors.currentClass.g,
                    b: colors.currentClass.b,
                    a: colors.currentClass.a
                },
                t: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 0
                }
            }
        }

        colors.scheduleFrame = { enabled: false, c: { r: 0, g: 0, b: 0, a: 0 }, t: { r: 0, g: 0, b: 0, a: 0 } }

        return { ...state, customization: { ...state.customization, theme: { ...state.customization.theme, colors: colors } } }
    },
    3: (state: any) => {
        return { ...state, customization: { ...state.customization, theme: { ...state.customization.theme, icons: defaultCustomizations.theme.icons } } }
    },
    4: (state: any) => {
        return { ...state, schedule: { ...state.schedule, lunch: ( state.schedule.lunch === 0 ? 1 : state.schedule.lunch ) } }
    },
    5: (state: any): any => {
        resetStorage();
        return { ...state };
    },
    6: (state: any): any => {
        return { ...state, customization: { ...state.customization, tutorial: defaultCustomizations.tutorial } }
    },
    7: (state: any): any => {
        return { ...state }
    },
    8: (state: any): any => {
        if (state.studentvue.isLoggedIn && (state.stv.info?.content.CurrentSchool || '') !== forSchoolName) {
            resetStorage();
            return { ...state };
        }
        return { ...state };
    },
    9: (state: any) => {
        return {...state, misc: { ...state.misc, presentationMode: false }}
    },
    10: (state: any) => {
        return { ...state, customization: { ...state.customization, theme: { ...state.customization.theme, colors: { ...state.customization.theme.colors, schedule: { ...state.customization.theme.colors.schedule, [ClassIDS.Passing]: defaultCustomizations.theme.colors.schedule[ClassIDS.Passing] } } } }}
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */
import * as Sentry from "@sentry/react";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
  stateTransformer: state => {
    return JSON.stringify({...state, studentvue: redactStructure(state.studentvue||{}), stv: redactStructure(state.stv||{}) })
  },
  actionTransformer: action => {
    if (action.type == "persist/REHYDRATE") {
        return {...action, payload: {...action.payload, studentvue: redactStructure(action.payload?.studentvue||{"nodata":"data"}), stv: redactStructure(action.payload?.stv||{"nodata":"data"}) }}
    }
    else if ((action.type as string).startsWith("stv/")) {
        return {...action, payload: redactStructure(action.payload)}
    }
    else if ((action.type as string).startsWith("studentvue/")) {
        return {...action, payload: redactStructure(action.payload)}
    } else {
        return action
    }
    }
});

export const persistConfig = {
    key: 'v5ReduxData',
    version: 10,
    storage,
    blacklist: [
        "router"
    ],
    migrate: createMigrate(migrations, { debug: process.env.NODE_ENV !== 'production' }),
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    schedule: scheduleReducer,
    studentvue: studentvueReducer,
    misc: miscReducer,
    stv: stvReducer,
    customization: customReducer,
    router: pageReducer
}))


export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (gDM) => gDM({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(createReduxMiddleware()),
  enhancers: [
    sentryReduxEnhancer
  ]
})
export const persistor = persistStore(store)


export const resetStorage = () => { 
    persistor.purge().then(() => {
        store.dispatch(resetSchedule())
        store.dispatch(resetStudentvue())
        store.dispatch(resetMisc())
        store.dispatch(resetStv())
        store.dispatch(resetCustom())
        store.dispatch(resetPage())
    })
    
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
