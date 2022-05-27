import React from 'react'
import { createRoot } from 'react-dom/client'
import eruda from '../eruda'
import { EditorApp } from './EditorApp'
const root = createRoot(document.getElementById("app")!)
function render() {
    root.render(<React.StrictMode><EditorApp /></React.StrictMode>)
}

if (process.env.NODE_ENV == "production") {
    render()
} else {
    eruda(render)
}