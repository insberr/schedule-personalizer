//import { useEffect } from "react";
import { testData } from "../../testData";
import { Stdata } from "../../types";
import Button from 'react-bootstrap/Button'
import { useState } from "react";
import { Stage0 } from "./steps/Stage0";
import { StageManually1 } from "./steps/StageManually1";
type SetupPageProps = {
    setSchedule: (s: Stdata) => void
}

function SetupPage(props: SetupPageProps) {
    //useEffect
    const [stage, setStage] = useState(0);
    /*function loadTestSchedule() {
        props.setSchedule(testData)
    }*/
    switch (stage) { 
        case -1: // fuck you no importing manually
            return <StageManually1 setStage={setStage} />
            break;
        case 0: // Which import method do ya want?
            return <Stage0 setStage={ setStage }/>
            break;
        default: 
            return (<div>Invalid state! <Button onClick={ () => { setStage(0) } } variant="primary">Reset</Button></div>)
    }
}
export default SetupPage;