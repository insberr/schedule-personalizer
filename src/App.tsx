import React,  { useEffect, useState } from "react"
import SchedulePage from "./pages/schedule";
import { Customizations, Stdata } from "./types";
import LoadSpinner from "./components/LoadSpinner";
import Theme from "./components/ThemeComponent";
import StudentVueReloader from "./components/StudentVueReloader";
import { CL } from "./types"
//console.log(data)

const SetupPage = React.lazy(() => import("./pages/setup"))
//import { testData } from "./testData"; // prob should only import this when in development, to strip it out of production
function App() {
    const [sch, setSch] = useState<CL[] | undefined>(undefined) // maybe somehow load this from localstorage? 
    // store studentvue specific info/theme info in a different state?
    function setTheme(theme: Customizations) {
        if (!sch) return
        const newSch = Object.assign({}, sch, { customization: theme })
        setSch(newSch)
    }
    if (!sch) {
        if (sch === false) {
            return <LoadSpinner />
        }
        return <React.Suspense fallback={<LoadSpinner />}><SetupPage setSchedule={ setSch }/></React.Suspense> // replace loading text with a spinner
    }
    return <><SchedulePage sch={sch} /></> // it just works
}
export default App;