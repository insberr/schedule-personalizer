//import { useEffect } from "react";
import { testData } from "../../testData";
import { Stdata } from "../../types";

type SetupPageProps = {
    setSchedule: (s: Stdata) => void
}

function SetupPage(props: SetupPageProps) {
    //useEffect
    function loadTestSchedule() {
        props.setSchedule(testData)
    }
    return <div><button className="btn btn-primary" onClick={ loadTestSchedule }>Load test schedule</button></div>
}
export default SetupPage;