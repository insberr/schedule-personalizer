import React, { useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import * as Sentry from '@sentry/react';

import * as api from './apis/studentvue/studentVueAPI';

import { Page } from './storage/page';
import { Route } from './router/Route';

import { SettingsPage } from './pages/settings';
import { Manual } from './pages/setup/steps/Manual';
import { StudentID } from './pages/studentID';
import { SchoolInfo } from './pages/schoolInfo';
import Login from './pages/login/Login';

import Schedule from './pages/schedule';
import { PaletteMode, Skeleton } from '@mui/material';
import { isStudentVue, studentVueCredentials } from './storage/studentvue';

const SetupPage = React.lazy(() => import('./pages/setup'));
const EditorPage = React.lazy(() => import('./pages/editor'));

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  primary: {
                      main: '#505050',
                  },
                  secondary: {
                      main: '#dc143c',
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: '#dc143c',
                  },
                  secondary: {
                      main: '#dc143c',
                  },
                  background: {
                      default: '#1a1a1a',
                  },
              }),
    },
});

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(() => createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light')), [prefersDarkMode]);

    useEffect(() => {
        if (isStudentVue.value || studentVueCredentials.value.username !== '') {
            Sentry.setUser({ id: studentVueCredentials.value.username });
        } else {
            Sentry.setUser(null);
        }
    }, []);

    return (
        <React.Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
            <Route routes={[Page.SCHEDULE, Page.SETTINGS, Page.EDITMANUALLY, Page.LOGIN, Page.STUDENTID, Page.SCHOOL]}>
                <Route routes={[Page.SCHEDULE]} hide={true}>
                    <Schedule />
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
            </Route>
            <Route routes={[Page.SETUP]}>
                <SetupPage />
            </Route>
            <Route routes={[Page.EDITOR]}>
                <EditorPage />
            </Route>
        </React.Suspense>
    );
}

export default App;
