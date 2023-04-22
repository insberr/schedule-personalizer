import React from 'react';
import { Page } from './storage/page';
import { Route } from './router/Route';

// import { SettingsPage } from './pages/settings';
// import { Manual } from './pages/setup/steps/Manual';
// import { StudentID } from './pages/studentID';
// import { SchoolInfo } from './pages/schoolInfo';
// import Login from './pages/login/Login';

import Schedule from './pages/schedule';
import { Skeleton } from '@mui/material';

// const SetupPage = React.lazy(() => import('./pages/setup'));
// const EditorPage = React.lazy(() => import('./pages/editor'));

export default function App() {
    return (
        <React.Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Route routes={[Page.SCHEDULE, Page.SETTINGS, Page.EDITMANUALLY, Page.LOGIN, Page.STUDENTID, Page.SCHOOL]}>
                <Route routes={[Page.SCHEDULE]} hide={true}>
                    <Schedule />
                </Route>
                <Route routes={[Page.SETTINGS]} hide={false}>
                    {/* <SettingsPage /> */}
                </Route>
                <Route routes={[Page.EDITMANUALLY]} hide={false}>
                    {/* <Manual
                        isEdit={true}
                        setStage={(n: number) => {
                            n;
                        }}
                    /> */}
                </Route>
                <Route routes={[Page.LOGIN]} hide={false}>
                    {/* <Login /> */}
                </Route>
                <Route routes={[Page.STUDENTID]} hide={false}>
                    {/* <StudentID /> */}
                </Route>
                <Route routes={[Page.SCHOOL]} hide={false}>
                    {/* <SchoolInfo /> */}
                </Route>
            </Route>
            <Route routes={[Page.SETUP]}>{/* <SetupPage /> */}</Route>
            <Route routes={[Page.EDITOR]}>{/* <EditorPage /> */}</Route>
        </React.Suspense>
    );
}
