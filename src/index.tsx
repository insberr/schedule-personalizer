import 'preact/debug';

import { render } from 'preact';
import { Suspense, lazy } from 'preact/compat';

import eruda from './eruda';

import PreactErrorCatcher from './components/PreactErrorCatcher';
import ThemeWrapper from './themeWrapper';
import LoadSpinner from './components/LoadSpinner';
const App = lazy(() => import('./App'));

import { identifyCommit } from './lib/lib';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const isProductionBuild = process.env.NODE_ENV === 'production';
console.log(`Schedule personalizer v5 (${identifyCommit()})`);

if (navigator.serviceWorker) {
    if (isProductionBuild || new URLSearchParams(window.location.search).get('sw') === 'yup') {
        navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url), { type: 'module' });
    }
}

const documentApp = document.getElementById('app');
if (!documentApp) {
    console.error('What the fuck? theres no app element? wtf?');
    throw new Error('God is dead and we have killed him');
}

const mainComponentToRender = (
    <ThemeWrapper>
        <PreactErrorCatcher>
            <Suspense fallback={<LoadSpinner />}>
                <App />
            </Suspense>
        </PreactErrorCatcher>
    </ThemeWrapper>
);

if (isProductionBuild) {
    render(mainComponentToRender, documentApp);
} else {
    eruda(() => {
        render(mainComponentToRender, documentApp);
    });
}
