import React,  { useEffect, useState } from "react"
import SchedulePage from "./pages/schedule";
import { Customizations } from "./types";
import LoadSpinner from "./components/LoadSpinner";
import Theme from "./components/ThemeComponent";
// import StudentVueReloader from "./components/StudentVueReloader";
import { CL } from "./types"
import { Header } from "./components/Header";
import { SettingsPage } from "./pages/settings";
import { StorageQuery, getV1Data, getV5Data, setV5Data } from "./storageManager";

const SetupPage = React.lazy(() => import("./pages/setup"))
function App() {

    const v1Data = getV1Data();
    if (v1Data !== null && getV5Data(StorageQuery.Studentvue) === null) {
        const tempData = JSON.parse(v1Data);
        const {password, username, rememberMe} = tempData;
        setV5Data({ password: password, username: username, stayLoggedIn: rememberMe }, StorageQuery.Studentvue)
    }
    if (getV5Data(StorageQuery.Courses)) {
        //
    }

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
    
    setV5Data(sch, StorageQuery.Courses);
    return <><Header setup={setIsSetup} c={isSetup} /><SchedulePage sch={sch} /></> // it just works
}
export default App;