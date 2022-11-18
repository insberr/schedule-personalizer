import { createRoot } from 'react-dom/client';
import { MatUIThemer } from './components/MatUIThemer';
import { Button, Link, Typography } from '@mui/material';
import { store } from './storage';
import { ModeSwitcher } from './components/ModeSwitcher';
import { Route } from './lib/router/Route';
import { SchedulePage } from './pages/schedule';
import { Page } from './types';

async function main() {
    const eleroot = document.getElementById('app') as HTMLDivElement;
    const root = createRoot(eleroot);
    root.render(
        <MatUIThemer>
            <>
                <Route routes={[Page.schedule]}>
                    <SchedulePage />
                </Route>
            </>
        </MatUIThemer>
    );
}

main();
