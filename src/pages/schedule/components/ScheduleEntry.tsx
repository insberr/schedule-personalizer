import { formatClassTime, formatClassPeriodName } from "../../../lib"
import { Class } from "../../../types"
import ListGroup from 'react-bootstrap/ListGroup'

type ScheduleEntryProps = {
    key: string
    period: Class
}

function ScheduleEntry(props: ScheduleEntryProps) {
    return (
    <ListGroup.Item className="d-flex justify-content-around align-items-center">
        <div key="classTime" className="">{formatClassTime(props.period.startTime, props.period.endTime)}</div>
        <div key="className" className="">{props.period.name || formatClassPeriodName(props.period) }</div>
        <div key="teacherName" className="">{props.period.teacher?.name || "no name"}</div>
        <div key="roomNumber" className="">R {props.period.room}</div>
    </ListGroup.Item>
)
}
export default ScheduleEntry