import { Stdata } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import { getCurrentTerm } from "../../../lib"
import ListGroup from 'react-bootstrap/ListGroup'
type ScheduleProps = {
    sch: Stdata
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
            <Center className="date">Monday: 69/69/69</Center>
        </ListGroup.Item>
        { props.sch.terms[getCurrentTerm(props.sch)].classes.map((period) => {
            return <ScheduleEntry key={period.period} period={period} />
        }) }
    </ListGroup></Center>)
}
export default Schedule