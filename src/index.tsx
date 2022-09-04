//import { createRoot } from "react-dom/client";
//import { StrictMode } from "react";
import eruda from './eruda'
import App from './App'
import { identifyCommit } from "./lib";
import { Err } from "./components/ErrBoundery"
import * as Sentry from "@sentry/react";
import { store, persistor, resetStorage } from './storage/store'
import { PersistGate } from 'redux-persist/integration/react';
import LoadSpinner from "./components/LoadSpinner";
import { Provider } from 'react-redux'
import { BrowserTracing } from '@sentry/tracing';
// import { BrowserTracing } from "@sentry/tracing";
import SentryRRWeb from "@sentry/rrweb";
import { Button } from 'react-bootstrap';
const tracesSampleRate = process.env.NODE_ENV == "production" ? 0.2 : 1.0

function startLoad() {
    if (process.env.NODE_ENV == "production") {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),{type: 'module'});
        }
    }

    Sentry.init({
        dsn: "https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608",
        
        integrations: [new BrowserTracing({
            tracingOrigins: ['localhost', 'schedule.insberr.com', 'insberr.github.io', 'schedule.insberr.live'],
        }),
            new SentryRRWeb({})
        ],
        normalizeDepth: 10,
        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate,
        release: identifyCommit()||"dev",
    });

    const app = document.getElementById("app");
    if (!app) {
        console.error("What the fuck? theres no app element? wtf?");
        throw new Error("God is dead and we have killed him");
    }

    console.log("Schedule personalizer v2 ("+identifyCommit()+")");
    Promise.all([import("react-dom/client"), import("react")]).then(([reactDom, React]) => {   
        const loadingthing = document.getElementById("loading")
        if (loadingthing) loadingthing.remove();
    const root = reactDom.createRoot(app);
    const Withsentry = process.env.NODE_ENV == "production" ? Sentry.withErrorBoundary(App, {showDialog: true, fallback: <h3 className="text-center full-center"> Something went wrong, Please try again later. <br /> If you are a developer, check the console for more details{" "}<br /><a href="https://forms.gle/kwhHzBReokA3EEEd8">Feedback form</a><br /><Button onClick={() => { resetStorage(); location.reload();}}>Reset</Button></h3>}) : App;
    root.render((<Err>
                    <React.StrictMode>
                        
                        <Provider store={store}>
                            <PersistGate loading={<LoadSpinner />} persistor={persistor}>
                                <Withsentry />
                            </PersistGate>
                        </Provider>
                        
                    </React.StrictMode>
                </Err>));
    })
}

if (process.env.NODE_ENV == "production") {
    startLoad();
} else {
    eruda(startLoad);
}
