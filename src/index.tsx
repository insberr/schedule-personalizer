import { createRoot } from 'react-dom/client';
import { MatUIThemer } from './components/MatUIThemer';
import { Backdrop, Button, CircularProgress, Link, Typography } from '@mui/material';
import { store } from './storage';
import { ModeSwitcher } from './components/ModeSwitcher';
import { Route } from './lib/router/Route';
import { SchedulePage } from './pages/schedule';
import { Page } from './types';
import './pullers';
import { Suspense } from 'react';
import { TopBar } from './components/TopBar';
import './lib/today';
import { SettingsPage } from './pages/settings';

async function main() {
    const eleroot = document.getElementById('app') as HTMLDivElement;
    const root = createRoot(eleroot);
    root.render(
        <MatUIThemer>
            <Suspense
                fallback={
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            >
                <TopBar />
                <Route routes={[Page.schedule]}>
                    <SchedulePage />
                </Route>
                <Route routes={[Page.settings]}>
                    <SettingsPage />
                </Route>
            </Suspense>
        </MatUIThemer>
    );
}

main();
