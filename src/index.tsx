import ReactDOM from "react-dom";
import App from "./App";
import * as bootstrap from 'bootstrap'; // load bootstrap js
if (navigator.serviceWorker) {
    navigator.serviceWorker.register(new URL('./sw.ts', import.meta.url))
}

const app = document.getElementById("app");
ReactDOM.render(<App />, app);