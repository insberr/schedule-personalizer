import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Terms } from './types';

import SchedulePage from './pages/schedule';
import { SettingsPage } from './pages/settings';

import { RootState } from "./storage/store";
import { setTerms } from "./storage/schedule";

import LoadSpinner from './components/LoadSpinner';
import { Header } from './components/Header';
import { setStudentVueData, useStudentvue } from './storage/studentvue';
import * as Sentry from '@sentry/react';
import { useCustomizations, reset as customizationsReset } from './storage/customizations';
import { useSTV } from './storage/studentvueData';
import * as api from './apis/studentvue/studentVueAPI';


const SetupPage = React.lazy(() => import("./pages/setup"));

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

    if (!isSetupComplete) {
        return (
            <React.Suspense fallback={<LoadSpinner />}>
                <SetupPage setSchedule={setSch} />
            </React.Suspense> // replace loading text with a spinner
        );
    }

    return (
        <>
            <div id="schpage" className={isSetup ? "hidden" : ""}>
                <SchedulePage setup={setIsSetup} />
                
            </div>
            <div id="settings" className={!isSetup ? "hidden" : ""}>
                <Header setup={setIsSetup} c={isSetup} />
                <SettingsPage setup={setIsSetup} setSchedule={setSch} />
            </div>
            
        </>
    );
}

export default App;
