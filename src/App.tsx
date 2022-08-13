import React,  { useEffect, useState } from "react"
import SchedulePage from "./pages/schedule";
import { Customizations, Stdata } from "./types";
import LoadSpinner from "./components/LoadSpinner";
import Theme from "./components/ThemeComponent";
import StudentVueReloader from "./components/StudentVueReloader";
import { CL } from "./types"
import { Header } from "./components/Header";
import { SettingsPage } from "./pages/settings";
import { defaultStruct } from "./defaultValues"

const SetupPage = React.lazy(() => import("./pages/setup"))
function App() {
    const [sch, setSch] = useState<CL[] | undefined>(undefined) // maybe somehow load this from localstorage? 
    const [isSetup, setIsSetup] = useState<boolean>(false)
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
    if (isSetup) {
        return <><Header setup={setIsSetup} c={isSetup} /><SettingsPage /></>
    }
    return <><Header setup={setIsSetup} c={isSetup} /><SchedulePage sch={sch} /></> // it just works
}
export default App;