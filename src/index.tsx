import eruda from './eruda';

import { Button, CssBaseline, PaletteMode, ThemeProvider, createTheme } from '@mui/material';
import { createRoot } from 'react-dom/client';
import React, { StrictMode, Suspense } from 'react';

import { Err } from './components/ErrBoundery';
const App = React.lazy(() => import('./App'));

import { identifyCommit } from './lib/lib';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import SentryRRWeb from '@sentry/rrweb';

// import { update } from './updatey';
//mport { RiRobotFill } from "react-icons/ri";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { resetStorage } from './storage/store';
import LoadSpinner from './components/LoadSpinner';

const tracesSampleRate = process.env.NODE_ENV == 'production' ? 0.2 : 1.0;

function StartLoad() {
    if (navigator.serviceWorker) {
        if (process.env.NODE_ENV == 'production' || new URLSearchParams(window.location.search).get('sw') == 'yup') {
            navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url), { type: 'module' });
        }
    }

    Sentry.init({
        dsn: 'https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608',

        integrations: [
            new BrowserTracing({
                tracingOrigins: ['localhost', 'schedule.insberr.com', 'insberr.github.io', 'schedule.insberr.live'],
            }),
            new SentryRRWeb({}),
        ],
        normalizeDepth: 10,
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate,
        environment: process.env.NODE_ENV,
        release: identifyCommit() || 'dev',
    });

    console.log('Schedule personalizer v5 (' + identifyCommit() + ')');

    // if (window.rroot) {
    //     window.rroot.unmount();
    // }

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

    // const loadingthing = document.getElementById('loading');
    // if (loadingthing) loadingthing.remove();

    // window.rroot = root;
    return (
        <Err>
            <StrictMode>
                <Withsentry />
            </StrictMode>
        </Err>
    );
}

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

const theme = createTheme(getDesignTokens('dark'));

const app = document.getElementById('app');
if (!app) {
    console.error('What the fuck? theres no app element? wtf?');
    throw new Error('God is dead and we have killed him');
}
const root = createRoot(app);
if (process.env.NODE_ENV === 'production') {
    root.render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<LoadSpinner />}>
                <StartLoad />
            </Suspense>
        </ThemeProvider>
    );
} else {
    eruda(() => {
        root.render(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Suspense fallback={<LoadSpinner />}>
                    <StartLoad />
                </Suspense>
            </ThemeProvider>
        );
    });
}

// declare global {
//     interface Window {
//         rroot: Root | undefined;
//         fupdate: () => void;
//     }
// }

// window.fupdate = update;
