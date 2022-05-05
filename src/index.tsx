import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { fetchData } from "./studentvue";
import eruda from './eruda'
import App from './App'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const tracesSampleRate = process.env.NODE_ENV == "production" ? 0.2 : 1.0

function startLoad() {
if (process.env.NODE_ENV == "production") {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),{type: 'module'})
    }
}

if (process.env.NODE_ENV != "production") {
    const creds = localStorage.getItem("testcreds")
    if (creds) {
        fetchData(creds.split(":")[0], creds.split(":")[1])
    }
    
}
if (process.env.NODE_ENV == "production") {
Sentry.init({
    dsn: "https://a5ab5a1946bd4e31a06ca456fc5b30fc@o1233680.ingest.sentry.io/6382608",
    integrations: [new BrowserTracing()],
  
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate,
    environment: process.env.NODE_ENV ? process.env.NODE_ENV : "development"
  });
}
const app = document.getElementById("app");
if (!app) {
    console.error("What the fuck? theres no app element? wtf?");
    throw new Error("God is dead and we have killed him");
}

const root = createRoot(app)
root.render(<StrictMode><Sentry.ErrorBoundary fallback={<div> A fatal error has occurred. </div>} showDialog={ process.env.NODE_ENV == "production" }><App /></Sentry.ErrorBoundary></StrictMode>);
}
if (process.env.NODE_ENV == "production") {
    startLoad()
} else {
    eruda(startLoad)
}