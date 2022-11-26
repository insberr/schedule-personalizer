import { createRoot } from 'react-dom/client';
import { MatUIThemer } from './components/MatUIThemer';
import { Backdrop, CircularProgress } from '@mui/material';
import './pullers';
import { StrictMode, Suspense } from 'react';
import './lib/today';
import { MainPage } from './MainPage';

async function main() {
    const eleroot = document.getElementById('app') as HTMLDivElement;
    const root = createRoot(eleroot);

    root.render(
        <StrictMode>
            <MatUIThemer>
                <Suspense
                    fallback={
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    }
                >
                    <MainPage />
                </Suspense>
            </MatUIThemer>
        </StrictMode>
    );
}

main();

