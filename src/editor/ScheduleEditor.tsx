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

        <div>
            <h4> Custom Schedule </h4>
            <span>add later, probably a thing where you add to a list</span>
            <br />
        </div>
    </div>)
}
