import React from 'react'
import { createRoot } from 'react-dom/client'
import { Err } from '../components/ErrBoundery'
import eruda from '../eruda'
import { EditorApp } from './EditorApp'

const app = document.getElementById("app")
if (!app) {
    console.error("What the fuck? theres no app element? wtf?");
    throw new Error("God is dead and we have killed him");
}
const root = createRoot(app)

function render() {
    root.render(<Err><React.StrictMode><EditorApp /></React.StrictMode></Err>)
}

if (process.env.NODE_ENV == "production") {
    render()
} else {
    eruda(render)
}