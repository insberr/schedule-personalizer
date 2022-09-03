import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Manual } from './steps/Manual';
import { Login } from './steps/Login';
import { Features } from './steps/Features';

import { Terms } from '../../types';
import { IntroPonent } from './components/Introponent';
import { useDispatch } from "react-redux";
import { setSetupComplete } from '../../storage/misc';
import { AddToHomeScreen } from './steps/AddToHomeScreen';


type SetupPageProps = {
    setSchedule: (s: Terms) => void
}

function SetupPage(props: SetupPageProps) {
    //useEffect
    const [stage, setStage] = useState(0);
    const [schedule, setLocalSchedule] = useState<Terms | undefined>(undefined);
    const dispatch = useDispatch();
    useEffect(() => {
        if (stage != 69) {
            return;
        }
        if (schedule) {
            //setV5Data(StorageQuery.Setup, true);
            dispatch(setSetupComplete(true));

            // TODO: Add manual setup terms
            props.setSchedule(schedule)
        }
    })
    /*function loadTestSchedule() {
        props.setSchedule(testData)
    }*/

    // maybe use enum for stages valuse??
    let thing = <div />
    switch (stage) { 
        case -1: // fuck you no importing manually
            thing = <Manual setStage={setStage} setSchedule={ setLocalSchedule }  />
            break;
        case 0: {// studentvue login
            const params = new URLSearchParams(window.location.search) // id=123
            const fromVOne = params.get('fromVOne')
            if (fromVOne === 'true') {
                thing = <AddToHomeScreen setStage={setStage} />
            } else if (window.matchMedia('(display-mode: standalone)').matches) {
                setStage(1)
            } else {
                thing = <AddToHomeScreen setStage={setStage}></AddToHomeScreen>
            }
            break;
        }
        case 1: {
            thing = <Features setStage={setStage} /> // <Login setSchedule={ setLocalSchedule } setStage={setStage} /> // use a special setStudentvue hook?
            break;
        }
        case 2: // lunch autodetect failure, set force lunch
            thing = <div> todo </div>
            break;
        case -2: // when you skip importing, which lunch? (Should use same component as 2)
            thing = <div> todo </div>
            break;
        case 69: // the schedule will only be set in this state, so stages can pass schedule data between them (lunch detect failure)
            thing = <div />
            break;
        case 420:
            thing = <Login setSchedule={ setLocalSchedule } setStage={setStage} /> // <WhatsNew setStage={setStage} />
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