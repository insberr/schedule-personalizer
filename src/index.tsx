import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import eruda from './eruda'
import App from './App'
import { identifyCommit } from "./lib";
import { Err } from "./components/ErrBoundery"

const tracesSampleRate = process.env.NODE_ENV == "production" ? 0.2 : 1.0

function startLoad() {
if (process.env.NODE_ENV == "production") {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),{type: 'module'})
    }
}

const app = document.getElementById("app");
if (!app) {
    console.error("What the fuck? theres no app element? wtf?");
    throw new Error("God is dead and we have killed him");
}
console.log("Schedule personalizer v2 ("+identifyCommit()+")")
const root = createRoot(app)
root.render(<Err><StrictMode><App /></StrictMode></Err>);
}
if (process.env.NODE_ENV == "production") {
    startLoad()
} else {
    eruda(startLoad)
}