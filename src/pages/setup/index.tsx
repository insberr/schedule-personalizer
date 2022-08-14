import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Manual } from './steps/Manual';
import { Login } from './steps/Login';

import { CL } from '../../types';
import { IntroPonent } from './components/Introponent';

import { StorageQuery, setV5Data } from '../../storageManager';


type SetupPageProps = {
    setSchedule: (s: CL[]) => void
}

function SetupPage(props: SetupPageProps) {
    //useEffect
    const [stage, setStage] = useState(0);
    const [schedule, setLocalSchedule] = useState<CL[] | undefined>(undefined);
    useEffect(() => {
        if (stage != 69) {
            return;
        }
        if (schedule) {
            setV5Data(StorageQuery.Setup, true);
            props.setSchedule(schedule)
        }
    })
    /*function loadTestSchedule() {
        props.setSchedule(testData)
    }*/
    let thing = <div />
    switch (stage) { 
        case -1: // fuck you no importing manually
            thing = <Manual setStage={setStage} setSchedule={ setLocalSchedule }  />
            break;
        case 0: // studentvue login
            thing = <Login setSchedule={ setLocalSchedule } setStage={setStage} /> // use a special setStudentvue hook?
            break;
        case 2: // lunch autodetect failure, set force lunch
            thing = <div> todo </div>
            break;
        case -2: // when you skip importing, which lunch? (Should use same component as 2)
            thing = <div> todo </div>
            break;
        case 69: // the schedule will only be set in this state, so stages can pass schedule data between them (lunch detect failure)
            thing = <div />
            break;
        default: 
            thing = (<div>Invalid state! <Button onClick={ () => { setStage(0) } } variant="primary">Reset</Button></div>)
    }
    return (
        <IntroPonent>
            { thing }
        </IntroPonent>
    )
}
export default SetupPage;