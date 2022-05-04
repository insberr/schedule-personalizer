import React,  { useEffect, useState } from "react"
import SchedulePage from "./pages/schedule";
import { Customizations, Stdata } from "./types";
import { getSavedData } from "./dataHandler";
import LoadSpinner from "./components/LoadSpinner";
import Theme from "./components/ThemeComponent";
import { refresh } from './studentvue'
import StudentVueReloader from "./components/StudentVueReloader";
//console.log(data)

const SetupPage = React.lazy(() => import("./pages/setup"))
//import { testData } from "./testData"; // prob should only import this when in development, to strip it out of production
function App() {
    const [sch, setSch] = useState<Stdata | false | undefined>(false) // maybe somehow load this from localstorage?
    function setTheme(theme: Customizations) {
        if (!sch) return
        const newSch = Object.assign({}, sch, { customization: theme })
        setSch(newSch)
    }
    function reloadStudentVue(schd?: Stdata) {
        if (!schd) {
            if (!sch) return
            schd = sch
        }
        refresh(schd).then(setSch)
    }
    useEffect(() => {
        getSavedData(reloadStudentVue)
    }, [])
    if (!sch) {
        if (sch === false) {
            return <LoadSpinner />
        }
        return <React.Suspense fallback={<LoadSpinner />}><SetupPage setSchedule={ setSch }/></React.Suspense> // replace loading text with a spinner
    }
    return <><SchedulePage sch={sch} /><Theme custom={ sch.customizations } /><StudentVueReloader reload={ reloadStudentVue }/></> // it just works
}
export default App;