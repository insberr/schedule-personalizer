import React,  { useEffect, useState } from "react"

import LoadSpinner from "./components/LoadSpinner";
import { Header } from "./components/Header";
// import StudentVueReloader from "./components/StudentVueReloader";
import { useSelector, useDispatch } from 'react-redux'

import SchedulePage from "./pages/schedule";
import { SettingsPage } from "./pages/settings";

import { setTerms, scheduleSlice } from "./storage/schedule";
import { useStudentvue } from './storage/studentvue';
import { RootState } from "./storage/store";

import * as api from './studentVueAPI';
// import { Customizations } from "./types";
// import Theme from "./components/ThemeComponent";

import { Terms } from "./types"
//import { StorageQuery, StorageDataTerms, getV1Data, getV5Data, setV5Data, StorageDataStudentvue, Terms } from "./storageManager";


// WHERE WE LEFT OFF;
// Make setup skip studentvue login if logged in in v1


const SetupPage = React.lazy(() => import("./pages/setup"))
function App() {
    //const sch = useSelector((state: RootState) => state.schedule.terms)
    const dispatch = useDispatch()
    function setSch(sch: Terms) {
        dispatch(setTerms(sch))
    }
    const stv = useStudentvue()
    const [isSetup, setIsSetup] = useState<boolean>(false);
    const isSetupComplete = useSelector((state: RootState) => state.misc.setupComplete)

    useEffect(() => {
        api.getAllSchedules(stv.username, stv.password).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }, [])
    /*useEffect(() => {
        setV5Data(StorageQuery.Init, {});

        const v1Data = getV1Data();
        if (v1Data !== null && (getV5Data(StorageQuery.Studentvue) as StorageDataStudentvue).isLoggedIn === false) {
            const tempData = JSON.parse(v1Data);
            const {password, username, rememberMe} = tempData;
            setV5Data(StorageQuery.Studentvue, { password: password, username: username, stayLoggedIn: rememberMe, isLoggedIn: true });
        }

        const v5TermsData = getV5Data(StorageQuery.Terms) as StorageDataTerms;
        if (v5TermsData !== null && v5TermsData !== undefined) {
            setSch(v5TermsData);
        }
        setIsSetupComplete(getV5Data(StorageQuery.Setup) as boolean);

        api.getAllSchedules((getV5Data(StorageQuery.Studentvue) as StorageDataStudentvue).username, (getV5Data(StorageQuery.Studentvue) as StorageDataStudentvue).password).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    },[]);
    */

    /*
    // Someday we will implement this
    function setTheme(theme: Customizations) {
        if (!sch) return
        const newSch = Object.assign({}, sch, { customization: theme })
        setSch(newSch)
    }
    
    if (!sch) {
        return <LoadSpinner />
    }
    */
    if (!isSetupComplete) {
        return (
            <React.Suspense fallback={ <LoadSpinner /> }>
                <SetupPage setSchedule={ setSch }/>
            </React.Suspense> // replace loading text with a spinner
        )
    }

    return (<>
            <div id="schpage" className={isSetup ? "hidden" : ""}>
                <SchedulePage setup={setIsSetup} />
            </div>
            <div id="settings" className={!isSetup ? "hidden" : ""}>
                <Header setup={ setIsSetup } c={ isSetup } /><SettingsPage setup={setIsSetup}/>
            </div>
            </>)
}

export default App;
