import { createRoot } from 'react-dom/client';
import { MatUIThemer } from './components/MatUIThemer';
import { Backdrop, CircularProgress } from '@mui/material';
import './pullers';
import './styles/index.scss';
import { StrictMode, Suspense } from 'react';
import './lib/today';
import { MainPage } from './MainPage';
import { init } from 'backend';
import { Err } from './components/ErrBound';
import { identifyCommit } from './lib/lib';

async function main() {
    console.log(`Schedule Personalizer Commit: '${identifyCommit()}'`);
    const eleroot = document.getElementById('app') as HTMLDivElement;
    const root = createRoot(eleroot);
    init();
    root.render(
        <StrictMode>
            <MatUIThemer>
                <Err>
                    <Suspense
                        fallback={
                            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }
                    >
                        <MainPage />
                    </Suspense>
                </Err>
            </MatUIThemer>
        </StrictMode>
    );
}

main();

