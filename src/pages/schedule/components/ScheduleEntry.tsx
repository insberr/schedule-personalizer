import { formatClassTime } from "../../../lib"
import { Class } from "../../../types"

type ScheduleEntryProps = {
    key: string
    period: Class
}

function ScheduleEntry(props: ScheduleEntryProps) {
    return (
    <li className="list-group-item d-flex justify-content-around align-items-center">
        <div className="">{formatClassTime(props.period.startTime, props.period.endTime)}</div>
        <div className="">{props.period.name}</div>
        <div className="">{props.period.teacher?.name || "no name"}</div>
        <div className="">R {props.period.room}</div>
    </li>
)
}
export default ScheduleEntry