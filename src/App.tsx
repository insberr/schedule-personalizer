import React,  { useState } from "react"
import SchedulePage from "./pages/schedule";
import { Stdata } from "./types";
import { data } from "./dataHandler";

console.log(data)

const SetupPage = React.lazy(() => import("./pages/setup"))
//import { testData } from "./testData"; // prob should only import this when in development, to strip it out of production
function App() {
    const [sch, setSch] = useState<Stdata | undefined>(undefined) // maybe somehow load this from localstorage?
    if (!sch) {
        return <React.Suspense fallback={<div> loading... </div>}><SetupPage setSchedule={ setSch }/></React.Suspense> // replace loading text with a spinner
    }
    return <SchedulePage sch={sch} /> // it just works
}
export default App;