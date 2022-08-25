import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Terms } from './types';

import SchedulePage from './pages/schedule';
import { SettingsPage } from './pages/settings';

import { RootState } from "./storage/store";
import { setTerms } from "./storage/schedule";

import LoadSpinner from './components/LoadSpinner';
import { Header } from './components/Header';
import { setSetupComplete } from './storage/misc';


const SetupPage = React.lazy(() => import("./pages/setup"));
function App() {
    const dispatch = useDispatch();
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
