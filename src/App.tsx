import React,  { useEffect, useState } from "react"
import SchedulePage from "./pages/schedule";
import { Customizations } from "./types";
import LoadSpinner from "./components/LoadSpinner";
import Theme from "./components/ThemeComponent";
// import StudentVueReloader from "./components/StudentVueReloader";
import { CL } from "./types"
import { Header } from "./components/Header";
import { SettingsPage } from "./pages/settings";
import { StorageQuery, StorageDataTerms, getV1Data, getV5Data, setV5Data, StorageDataStudentvue } from "./storageManager";


// WHERE WE LEFT OFF;
// Make setup skip studentvue login if logged in in v1


const SetupPage = React.lazy(() => import("./pages/setup"))
function App() {

    const [sch, setSch] = useState<CL[]>([]) // maybe somehow load this from localstorage? 
    const [isSetup, setIsSetup] = useState<boolean>(false)
    const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false)
    useEffect(() => {
        setV5Data(StorageQuery.Init, {});
        const v1Data = getV1Data();
        const v5StudentvueData = getV5Data(StorageQuery.Studentvue) as StorageDataStudentvue;
        if (v1Data !== null && v5StudentvueData.isLoggedIn === false) {
            const tempData = JSON.parse(v1Data);
            const {password, username, rememberMe} = tempData;
            setV5Data(StorageQuery.Studentvue, { password: password, username: username, stayLoggedIn: rememberMe, isLoggedIn: true })
        }

        const v5TermsData = getV5Data(StorageQuery.Terms) as StorageDataTerms;
        if (v5TermsData !== null && v5TermsData !== undefined) {
            setSch(v5TermsData[0].classes);
        }
        setIsSetupComplete(getV5Data(StorageQuery.Setup) as boolean);
        
        

    },[])
    useEffect(() => {
        console.log("setv5")
        if (sch.length > 1) {
            setV5Data(StorageQuery.Terms, [{termIndex: 1, classes: sch, startDate: new Date(), endDate: new Date()}, {termIndex: 2, classes: [], startDate: new Date(), endDate: new Date()}, { termIndex: 3, classes: [], startDate: new Date(), endDate: new Date()}]);
        }
        setIsSetupComplete(getV5Data(StorageQuery.Setup) as boolean);
    },[sch])
    

    
    // store studentvue specific info/theme info in a different state?
    function setTheme(theme: Customizations) {
        if (!sch) return
        const newSch = Object.assign({}, sch, { customization: theme })
        setSch(newSch)
    }
    if (!sch) {
        return <LoadSpinner />
    }
    
    if (!isSetupComplete) {
        return <React.Suspense fallback={<LoadSpinner />}><SetupPage setSchedule={ setSch }/></React.Suspense> // replace loading text with a spinner
    }
    if (isSetup) {
        return <><Header setup={setIsSetup} c={isSetup} /><SettingsPage /></>
    }
    // this should prob be in a useEffect()
    
    
    return <><Header setup={setIsSetup} c={isSetup} /><SchedulePage sch={sch} /></> // it just works
}
export default App;