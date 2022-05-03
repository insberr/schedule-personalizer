import { Class } from "../../../types"

type ScheduleEntryProps = {
    key: string
    period: Class
}

function ScheduleEntry(props: ScheduleEntryProps) {
    return (
    <div className="row justify-content-center">
        <div className="col"> 00:00 - 99:99 </div>
        <div className="col"> {props.period.name} </div>
        <div className="col"> {props.period.teacher?.name || "no name"} </div>
        <div className="col"> R {props.period.room} </div>
    </div>
)
}
export default ScheduleEntry