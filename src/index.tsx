import { createRoot }from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import * as bootstrap from 'bootstrap'; // load bootstrap js

if (process.env.NODE_ENV == "production") {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url),{type: 'module'})
    }
}
const app = document.getElementById("app");
const root = createRoot(app!)
root.render(<StrictMode><App /></StrictMode>);