import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import { Terms } from './types';

// import SchedulePage from './pages/schedule';
// import { SettingsPage } from './pages/settings';

import { Route } from "./router/Route";
import { Page } from './storage/page';
// import { RootState } from "./storage/store";
// import { setTerms } from "./storage/schedule";

import LoadSpinner from './components/LoadSpinner';
import { setStudentVueData, useStudentvue } from './storage/studentvue';
import * as Sentry from '@sentry/react';
import { useCustomizations, reset as customizationsReset } from './storage/customizations';
import { useSTV } from './storage/studentvueData';
import * as api from './apis/studentvue/studentVueAPI';
//import { MdImportExport } from 'react-icons/md';
import SchedulePage from "./pages/schedule";
import { SettingsPage } from "./pages/settings";

const SetupPage = React.lazy(() => import("./pages/setup"));
const EditorPage = React.lazy(() => import("./pages/editor"));
const PathOfPain = React.lazy(() => import("./pages/pathofpain"))
//const SchedulePage = React.lazy(() => import("./pages/schedule"))
//const SettingsPage = React.lazy(() => import("./pages/settings"))

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

   return (
    <React.Suspense fallback={<LoadSpinner />}>
        <Route routes={[Page.SCHEDULE, Page.SETTINGS]}>
            <Route routes={[Page.SCHEDULE]} hide={true}>
                <SchedulePage />
            </Route>
            <Route routes={[Page.SETTINGS]} hide={false}>
                <SettingsPage />
            </Route>
        </Route>
        <Route routes={[Page.SETUP]}> 
            <SetupPage />
        </Route>
        <Route routes={[Page.EDITOR]}>
            <EditorPage />
        </Route>
        <Route routes={[Page.PATHOFPAIN]}>
            <PathOfPain />
        </Route>
    </React.Suspense>
   )
}

export default App;
