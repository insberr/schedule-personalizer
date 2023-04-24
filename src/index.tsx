import { Suspense, lazy } from 'preact/compat';
// import { createRoot } from 'react-dom/client';
import { h, render } from 'preact';
import eruda from './eruda';
import { Button } from '@mui/material';

import { Err } from './components/ErrBoundery';
// import App from './App';
const App = lazy(() => import('./App'));

import { identifyCommit } from './lib/lib';

import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';

// import { update } from './updatey';
//mport { RiRobotFill } from "react-icons/ri";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { resetStorage } from './storage/store';
import LoadSpinner from './components/LoadSpinner';
import ThemeWrapper from './themeWrapper';

const tracesSampleRate = process.env.NODE_ENV == 'production' ? 0.2 : 1.0;
console.log('Schedule personalizer v5 (' + identifyCommit() + ')');

if (navigator.serviceWorker) {
    if (process.env.NODE_ENV == 'production' || new URLSearchParams(window.location.search).get('sw') == 'yup') {
        navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url), { type: 'module' });
    }
}

Sentry.init({
    dsn: 'https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608',

    integrations: [
        new Sentry.BrowserTracing({
            tracingOrigins: ['localhost', 'schedule.insberr.com', 'insberr.github.io', 'schedule.insberr.live'],
        }),
    ],
    normalizeDepth: 10,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate,
    environment: process.env.NODE_ENV,
    release: identifyCommit() || 'dev',
});

function StartLoad() {
    const Withsentry =
        process.env.NODE_ENV == 'production'
            ? Sentry.withErrorBoundary(App, {
                  showDialog: true,
                  fallback: (
                      <h3 className="text-center full-center">
                          {' '}
                          Something went terribly wrong, Please try again later. <br /> If you are a developer, check the console for more details{' '}
                          <br />
                          <Button
                              onClick={() => {
                                  Sentry.showReportDialog({
                                      title: 'Submit User Feedback.',
                                      subtitle: 'This feedback will be sent to the developers or managers of this instance of Schedule Personalizer.',
                                      subtitle2: '',
                                      labelComments: 'What happened?',
                                      labelSubmit: 'Submit',
                                      eventID: Sentry.captureEvent({
                                          message: 'btn-user-input-page-err',
                                      }),
                                  });
                              }}
                          >
                              Send Feedback
                          </Button>
                          <br />
                          <Button
                              onClick={() => {
                                  resetStorage(); // fully reseting storage -> clear localhost
                                  location.reload();
                              }}
                          >
                              Reset
                          </Button>
                      </h3>
                  ),
              })
            : App;

    // window.rroot = root;
    return (
        <Err>
            <Withsentry />
        </Err>
    );
}

const app = document.getElementById('app');
if (!app) {
    console.error('What the fuck? theres no app element? wtf?');
    throw new Error('God is dead and we have killed him');
}
// const root = createRoot(app);
if (process.env.NODE_ENV === 'production') {
    /*root.*/ render(
        // <StrictMode>
        <ThemeWrapper>
            <Suspense fallback={<LoadSpinner />}>
                <StartLoad />
            </Suspense>
        </ThemeWrapper>,
        // </StrictMode>,
        app
    );
} else {
    eruda(() => {
        /*root.*/ render(
            // <StrictMode>
            <ThemeWrapper>
                <Suspense fallback={<LoadSpinner />}>
                    <StartLoad />
                </Suspense>
            </ThemeWrapper>,
            // </StrictMode>,
            app
        );
    });
}
