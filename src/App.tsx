import React, { useEffect } from 'react';

import * as Sentry from '@sentry/react';

import * as api from './apis/studentvue/studentVueAPI';

import LoadSpinner from './components/LoadSpinner';

import { useDispatch } from 'react-redux';
import { setStudentVueData, useStudentvue } from './storage/studentvue';
import { useSTV } from './storage/studentvueData';

import { Page } from './storage/page';
import { Route } from './router/Route';

import SchedulePage from './pages/schedule';
import { SettingsPage } from './pages/settings';
import { Manual } from './pages/setup/steps/Manual';
import { StudentID } from './pages/studentID';
import { SchoolInfo } from './pages/schoolInfo';
import { BetaMap } from './pages/beta';
import Login from './pages/login/Login';

const SetupPage = React.lazy(() => import('./pages/setup'));
const EditorPage = React.lazy(() => import('./pages/editor'));
const PathOfPain = React.lazy(() => import('./pages/pathofpain'));

function App() {
    const dispatch = useDispatch();
    const stv = useStudentvue();
    const stvInf = useSTV();

    useEffect(() => {
        async function isValid() {
            const isValid = await api
                .validateCredentials(stv.username, stv.password)
                .then((res: boolean) => {
                    if (res) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .catch((err: string) => {
                    console.log('Validate Credentials Error In migrations: ' + err);
                    return undefined;
                });

            if (isValid === true || isValid === undefined) {
                return;
            }

            dispatch(
                setStudentVueData({
                    password: stv.password,
                    username: stv.username,
                    stayLoggedIn: false,
                    isLoggedIn: false,
                    gotSchedules: false,
                    lastRefresh: 0,
                })
            );
            return;
        }

        isValid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (stv.isLoggedIn || stv.username !== '') {
            Sentry.setUser({ id: stv.username });
        } else {
            Sentry.setUser(null);
        }
    }, [stv, stvInf]);

    return (
        <React.Suspense fallback={<LoadSpinner />}>
            <Route routes={[Page.SCHEDULE, Page.SETTINGS, Page.EDITMANUALLY, Page.LOGIN, Page.STUDENTID, Page.SCHOOL, Page.BETA]}>
                <Route routes={[Page.SCHEDULE]} hide={true}>
                    <SchedulePage />
                </Route>
                <Route routes={[Page.SETTINGS]} hide={false}>
                    <SettingsPage />
                </Route>
                <Route routes={[Page.EDITMANUALLY]} hide={false}>
                    <Manual
                        isEdit={true}
                        setStage={(n: number) => {
                            n;
                        }}
                    />
                </Route>
                <Route routes={[Page.LOGIN]} hide={false}>
                    <Login />
                </Route>
                <Route routes={[Page.STUDENTID]} hide={false}>
                    <StudentID />
                </Route>
                <Route routes={[Page.SCHOOL]} hide={false}>
                    <SchoolInfo />
                </Route>
                <Route routes={[Page.BETA]} hide={false}>
                    <BetaMap />
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
    );
}

export default App;
