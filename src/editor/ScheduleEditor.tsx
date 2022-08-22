import Button from "react-bootstrap/Button";
import { SchedulesType, schedules } from "../config/schedules"

type Props = {
    setSchedule: (schedule: SchedulesType) => void;
    schedule: SchedulesType;
}

export function ScheduleEditor(props: Props) {
    // console.log("ScheduleEditor.tsx props: " + JSON.stringify(props))

    return (<div>
        { Object.keys(schedules).map((k, i)=> {
                return <Button key={i} onClick={() => { props.setSchedule(schedules[k]) }}>{ k }</Button>
            })
        }
    </div>)
}
