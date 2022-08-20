import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import eruda from './eruda'
import App from './App'
import { identifyCommit } from "./lib";
import { Err } from "./components/ErrBoundery"
import * as Sentry from "@sentry/react";
import { store, persistor } from './storage/store'
import { PersistGate } from 'redux-persist/integration/react';
import LoadSpinner from "./components/LoadSpinner";
import { Provider } from 'react-redux'
// import { BrowserTracing } from "@sentry/tracing";

const tracesSampleRate = process.env.NODE_ENV == "production" ? 0.2 : 1.0

function startLoad() {
    if (process.env.NODE_ENV == "production") {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),{type: 'module'});
        }
    }

    if (process.env.NODE_ENV == "production") {
        Sentry.init({
            dsn: "https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608",
            /*
            integrations: [new BrowserTracing({
                tracingOrigins: ['localhost', 'schedule.insberr.com', 'insberr.github.io', 'schedule.insberr.live'],
            })],
            */

            // We recommend adjusting this value in production, or using tracesSampler
            // for finer control
            tracesSampleRate,
            environment: process.env.NODE_ENV
                ? process.env.NODE_ENV
                : "development",
            release: identifyCommit(),
        });
    }

    const app = document.getElementById("app");
    if (!app) {
        console.error("What the fuck? theres no app element? wtf?");
        throw new Error("God is dead and we have killed him");
    }

    console.log("Schedule personalizer v2 ("+identifyCommit()+")");

    const root = createRoot(app);
    root.render((<Err>
                    <StrictMode>
                        
                        <Provider store={store}>
                            <PersistGate loading={<LoadSpinner />} persistor={persistor}>
                                <App />
                            </PersistGate>
                        </Provider>
                        
                    </StrictMode>
                </Err>));
}

if (process.env.NODE_ENV == "production") {
    startLoad();
} else {
    eruda(startLoad);
}
