import { Class } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import ListGroup from 'react-bootstrap/ListGroup'
import { EventSchedule } from '../index';

type ScheduleProps = {
    sch: Class[]
    event: EventSchedule
}

function Schedule(props: ScheduleProps) {
    console.log(props)
    
    return (<Center>
        <ListGroup style={{ "width": "75vw" }}>
        <ListGroup.Item className="row background-clear justify-content-center text-center">
            <Center className="date">{ new Date().getDay() }: { new Date().getMonth() + 1 }/{ new Date().getDate() }/{ new Date().getFullYear() }</Center> 
        </ListGroup.Item>
        { props.sch.map((period, i) => {
            return <ScheduleEntry key={i.toString()} period={period} />
        }) }
    </ListGroup>
    <br></br>
    { props.event.isEvent ? props.event.info.message : null }
    </Center>)
}
export default Schedule