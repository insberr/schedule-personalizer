import { Class } from "../../../types"
import Center from "../../../components/Center"
import Button from "react-bootstrap/Button";
import ScheduleEntry from "./ScheduleEntry"
import { getCurrentTerm } from "../../../lib"
import ListGroup from 'react-bootstrap/ListGroup'

type ScheduleProps = {
    sch: Class[]
}

function Schedule(props: ScheduleProps) {
    console.log(props)
    // get current (viewed) trimester
    // get event and apply changes (if any)
    // make a value for todays schedule

    // actually: pass the viewed date and the Stdata to the get_day_merged_schedule function from src/studentSchedule and use that
    
    return (<Center>
        <ListGroup style={{ "width": "75vw" }}>
        <ListGroup.Item className="row background-clear justify-content-center text-center">
            <Center className="date">{ new Date().getDay() }: { new Date().getMonth() + 1 }/{ new Date().getDate() }/{ new Date().getFullYear() }</Center> 
        </ListGroup.Item>
        { props.sch.map((period, i) => {
            return <ScheduleEntry key={i.toString()} period={period} />
        }) }
    </ListGroup>
    <Button>Settings</Button></Center>)
}
export default Schedule