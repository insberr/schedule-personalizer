// import React from 'react';
import { Page, currentPage } from './storage/page';
import { Route } from './router/Route';
import { Suspense } from 'preact/compat';

// import { SettingsPage } from './pages/settings';
// import { Manual } from './pages/setup/steps/Manual';
// import { StudentID } from './pages/studentID';
// import { SchoolInfo } from './pages/schoolInfo';
// import Login from './pages/login/Login';

import Schedule from './pages/schedule';
import { Button, Skeleton } from '@mui/material';
import { setupComplete } from './storage/misc';

// const SetupPage = React.lazy(() => import('./pages/setup'));
// const EditorPage = React.lazy(() => import('./pages/editor'));

export default function App() {
    return (
        <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Route routes={[Page.SCHEDULE, Page.SETTINGS, Page.EDITMANUALLY, Page.LOGIN, Page.STUDENTID, Page.SCHOOL]}>
                <Route routes={[Page.SCHEDULE]} hide={true}>
                    <Schedule />
                </Route>
                <Route routes={[Page.SETTINGS]} hide={false}>
                    {/* <SettingsPage /> */}
                    <Button
                        onClick={() => {
                            window.Notification.requestPermission().then((result) => {
                                if (result === 'granted') {
                                    navigator.serviceWorker.getRegistration().then((reg) => {
                                        reg?.showNotification('Hello world!');
                                    });
                                    new Notification('Hello world!');
                                }
                            });
                        }}
                    >
                        Test Notification
                    </Button>
                    <Button
                        onClick={() => {
                            currentPage.value = Page.SCHEDULE;
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={() => {
                            currentPage.value = Page.SETUP;
                        }}
                    >
                        Setup
                    </Button>
                    <Button
                        onClick={() => {
                            throw new Error('Test crash');
                        }}
                    >
                        Test crash screen
                    </Button>
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
            <Route routes={[Page.SETUP]}>
                {/* <SetupPage /> */}
                <Button
                    onClick={() => {
                        setupComplete.value = true;
                        currentPage.value = Page.SCHEDULE;
                    }}
                >
                    To Schedule
                </Button>
            </Route>
            <Route routes={[Page.EDITOR]}>{/* <EditorPage /> */}</Route>
        </Suspense>
    );
}
