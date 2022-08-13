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
    
    return (<Center>
        <ListGroup style={{ "width": "75vw" }}>
        <ListGroup.Item className="row background-clear justify-content-center text-center">
            <Center className="date">{ new Date().getDay() }: { new Date().getMonth() + 1 }/{ new Date().getDate() }/{ new Date().getFullYear() }</Center> 
        </ListGroup.Item>
        { props.sch.map((period, i) => {
            return <ScheduleEntry key={i.toString()} period={period} />
        }) }
    </ListGroup></Center>)
}
export default Schedule