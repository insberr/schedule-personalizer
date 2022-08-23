import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Terms } from './types';
import { refreshStudentVueSchedules } from "./lib";
import * as settings from "./config/settings";

import SchedulePage from './pages/schedule';
import { SettingsPage } from './pages/settings';

import { RootState } from "./storage/store";
import { setTerms, useSchedule } from "./storage/schedule";
import { setLastRefresh, useStudentvue } from "./storage/studentvue";

import LoadSpinner from './components/LoadSpinner';
import { Header } from './components/Header';

const SetupPage = React.lazy(() => import("./pages/setup"));
function App() {
    // const sch = useSelector((state: RootState) => state.schedule.terms)
    const dispatch = useDispatch();
    function setSch(sch: Terms) {
        dispatch(setTerms(sch));
    }
    const stv = useStudentvue();
    const sch = useSchedule();
    const [isSetup, setIsSetup] = useState<boolean>(false);
    const isSetupComplete = useSelector(
        (state: RootState) => state.misc.setupComplete
    );

    // theres probably a better way to do this
    setInterval(() => {
        console.log(
            "[interval] Refreshing studentvue: ",
            refreshStudentVueSchedules(stv.username, stv.password)
        );
    }, settings.studentvueRefreshInterval);

    useEffect(() => {
        console.log("[on load] last refresh: ", stv.lastRefresh)
        if (stv.lastRefresh === undefined) {
            dispatch(setLastRefresh(new Date().getTime()));
            return;
        }
        
        console.log(new Date().getTime() - stv.lastRefresh)
        console.log(settings.studentvueRefreshInterval)
        if ((new Date().getTime() - stv.lastRefresh) >= settings.studentvueRefreshOnLoad) {
            console.log(
                "[on load] Refreshing studentvue: ",
                refreshStudentVueSchedules(stv.username, stv.password)
            );
        }
    }, []);

    /*
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
                <SettingsPage setup={setIsSetup} />
            </div>
        </>
    );
}

export default App;
