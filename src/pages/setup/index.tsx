import { useEffect, useState } from 'react';

// Types
import { Terms } from '../../types';

// Redux
import { useDispatch } from "react-redux";
import { setSetupComplete } from '../../storage/misc';

// Components
import { IntroPonent } from './components/Introponent';
import Button from 'react-bootstrap/Button';

// Steps
import { AddToHomeScreen } from './steps/AddToHomeScreen';
import { Features } from './steps/Features';
import { Login } from './steps/Login';
import { Manual } from './steps/Manual';


type SetupPageProps = {
    setSchedule: (s: Terms) => void
}

// TODO: Im sure theres a way better way to do this ...
function SetupPage(props: SetupPageProps) {
    const [stage, setStage] = useState(0);
    const [schedule, setLocalSchedule] = useState<Terms | undefined>(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        if (stage != 69) {
            return;
        }
        if (schedule) {
            dispatch(setSetupComplete(true));
            props.setSchedule(schedule)
        }
    })

    // TODO: maybe use enum for stages valuse??
    let thing = <div />
    switch (stage) { 
        case -1: {// fuck you no importing manually
            thing = <Manual setStage={setStage} setSchedule={ setLocalSchedule }  />
            break;
        }
        case 0: {// studentvue login
            if (window.matchMedia('(display-mode: standalone)').matches) {
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
        case 69: // the schedule will only be set in this state, so stages can pass schedule data between them (lunch detect failure)
            thing = <div />
            break;
        case 420:
            thing = <Login setSchedule={ setLocalSchedule } setStage={setStage} /> // <WhatsNew setStage={setStage} />
            break;
        default: 
            thing = (<div>Invalid state! How did we get here? <Button onClick={ () => { setStage(0) } } variant="primary">Back To Beginning</Button></div>)
    }
    return (
        <IntroPonent>
            { thing }
        </IntroPonent>
    )
}
export default SetupPage;