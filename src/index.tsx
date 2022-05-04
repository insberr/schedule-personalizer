import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { fetchData } from "./studentvue";
import eruda from './eruda'

if (process.env.NODE_ENV != "production") {
    // gamer devtools
    eruda()
}

import App from "./App";

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

const app = document.getElementById("app");
if (!app) {
    console.error("What the fuck? theres no app element? wtf?");
    throw new Error("God is dead and we have killed him");
}

const root = createRoot(app)
root.render(<StrictMode><App /></StrictMode>);