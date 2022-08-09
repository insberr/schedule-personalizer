//import { useEffect } from "react";
import { testData } from "../../testData";
import { Stdata } from "../../types";
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import { Stage0 } from "./steps/Stage0";
import { StageManually1 } from "./steps/StageManually1";
import { Stage1 } from "./steps/Stage1";
import Schedule from "../schedule/components/Schedule";
type SetupPageProps = {
    setSchedule: (s: Stdata) => void
}

function SetupPage(props: SetupPageProps) {
    //useEffect
    const [stage, setStage] = useState(0);
    const [schedule, setLocalSchedule] = useState<Stdata | undefined>(undefined);
    useEffect(() => {
        if (stage != 69) {
            return;
        }
        if (schedule) {
            props.setSchedule(schedule)
        }
    })
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
        case 1: // studentvue login
            return <Stage1 setSchedule={ setLocalSchedule } setStage={setStage} />
            break;
        case 2: // lunch autodetect failure, set force lunch
            return <div> todo </div>
            break;
        case -2: // when you skip importing, which lunch? (Should use same component as 2)
            return <div> todo </div>
            break;
        case 69: // the schedule will only be set in this state, so stages can pass schedule data between them (lunch detect failure)
            return <div />
            break;
        case 420:
            return <Schedule sch={ testData }/>
            break;
        default: 
            return (<div>Invalid state! <Button onClick={ () => { setStage(0) } } variant="primary">Reset</Button></div>)
    }
}
export default SetupPage;