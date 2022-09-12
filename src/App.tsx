import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Terms } from './types';

import SchedulePage from './pages/schedule';
import { SettingsPage } from './pages/settings';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import { RootState } from "./storage/store";
import Schedule, { setTerms } from "./storage/schedule";

import LoadSpinner from './components/LoadSpinner';
import { setStudentVueData, useStudentvue } from './storage/studentvue';
import * as Sentry from '@sentry/react';
import { useCustomizations, reset as customizationsReset } from './storage/customizations';
import { useSTV } from './storage/studentvueData';
import * as api from './apis/studentvue/studentVueAPI';
//import { MdImportExport } from 'react-icons/md';


const SetupPage = React.lazy(() => import("./pages/setup"));
const EditorPage = React.lazy(() => import("./editor/EditorApp"))
function App() {
    const dispatch = useDispatch();
    const stv = useStudentvue();
    const stvInf = useSTV();
    const customizations = useCustomizations();

    // fix weird problems ??
    useEffect(() => {
        if (customizations.theme === undefined) {
            dispatch(customizationsReset());
        }

        async function isValid() {
            const isValid = await api.validateCredentials(stv.username, stv.password).then((res: boolean) => {
                if (res) {
                    return true;
                } else {
                    return false;
                }
            }).catch((err: string) => {
                // TODO: handle this error and send to sentry
                console.log('Validate Credentials Error In migrations: ' + err);
                return undefined;
            })
            
            if (isValid === true || isValid === undefined) {
                return;
            }
            dispatch(setStudentVueData({ password: stv.password, username: stv.username, stayLoggedIn: false, isLoggedIn: false, gotSchedules: false, lastRefresh: 0 }));
            return;
        }

        isValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (stv.isLoggedIn) {
            Sentry.setUser({ id: stv.username });
        } else {
            Sentry.setUser(null);
        }
    },[stv, stvInf])

    
    function setSch(sch: Terms) {
        dispatch(setTerms(sch));
    }

    const isSetupComplete = useSelector(
        (state: RootState) => state.misc.setupComplete
    );

    const [isSetup, setIsSetup] = useState<boolean>(false);

    /*
    // TODO: Add customizations woo
    // Someday we will implement this
    function setTheme(theme: Customizations) {
        if (!sch) return
        const newSch = Object.assign({}, sch, { customization: theme })
        setSch(newSch)
    }
    */
   return (<BrowserRouter>
            <Routes>
                <Route path="/" element={<SchedulePage />} />
                <Route path="/setup" element={<React.Suspense fallback={<LoadSpinner />}><SetupPage /></React.Suspense>} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/editor" element={<React.Suspense fallback={<LoadSpinner />}><EditorPage /></React.Suspense>} />
            </Routes>
        </BrowserRouter>)
}

export default App;
