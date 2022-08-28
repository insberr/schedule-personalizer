import { Err } from '../components/ErrBoundery'
import eruda from '../eruda'
import { Demo } from './testApp'

const app = document.getElementById("app")
if (!app) {
    console.error("What the fuck? theres no app element? wtf?");
    throw new Error("God is dead and we have killed him");
}
Promise.all([import("react-dom/client"), import("react")]).then(([reactDom, React]) => {   
    const root = reactDom.createRoot(app)

    function render() {
        root.render(<Err><React.StrictMode><Demo /></React.StrictMode></Err>)
    }

    if (process.env.NODE_ENV == "production") {
        render()
    } else {
        eruda(render)
    }
})