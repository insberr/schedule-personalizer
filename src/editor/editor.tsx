import React from 'react'
import { createRoot } from 'react-dom/client'
import eruda from '../eruda'
import { EditorApp } from './EditorApp'

const app = document.getElementById("app")
if (!app) {
    console.error("What the fuck? theres no app element? wtf?");
    throw new Error("God is dead and we have killed him");
}
const root = createRoot(app)

function render() {
    root.render(<React.StrictMode><EditorApp /></React.StrictMode>)
}

if (process.env.NODE_ENV == "production") {
    render()
} else {
    eruda(render)
}