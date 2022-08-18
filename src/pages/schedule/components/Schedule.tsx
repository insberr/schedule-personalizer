import { Class } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import ListGroup from 'react-bootstrap/ListGroup'
import { EventSchedule } from '../index';

import Button from 'react-bootstrap/Button';

type ScheduleProps = {
    sch: Class[]
    event: EventSchedule
    displayDate: Date
    setDisplayDate: (date: Date) => void
}

function Schedule(props: ScheduleProps) {
    // console.log(props)
    
    return (<Center>
        <ListGroup style={{ "width": "75vw" }}>
        <ListGroup.Item className="row background-clear justify-content-center text-center">
            <Center className="date">{ props.displayDate.getDay() }: { props.displayDate.getMonth() + 1 }/{ props.displayDate.getDate() }/{ props.displayDate.getFullYear() }</Center> 
        </ListGroup.Item>
        { props.sch.map((period, i) => {
            return <ScheduleEntry key={i.toString()} period={period} />
        }) }
    </ListGroup>
    <br></br>
    { props.event.isEvent ? props.event.info.message : null }
    <br />
    <Button onClick={ () => {
        const newDate = new Date();
        newDate.setDate(props.displayDate.getDate() - 1);
        props.setDisplayDate(newDate);
    }}>Back 1 day</Button>
    <Button onClick={ () => { props.setDisplayDate(new Date()) } }>Now</Button>
    <Button onClick={ () => {
        const newDate = new Date();
        newDate.setDate(props.displayDate.getDate() + 1);
        props.setDisplayDate(newDate);
    }}>Forward 1 day</Button>
    </Center>)
}
export default Schedule