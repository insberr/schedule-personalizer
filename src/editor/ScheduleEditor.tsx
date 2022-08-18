import { SchedulesType } from "../config/schedules"

type Props = {
    setSchedule: (schedule: SchedulesType) => void;
    schedule: SchedulesType;
}

export function ScheduleEditor(props: Props) {
    console.log("ScheduleEditor.tsx props: " + JSON.stringify(props))
    return <div />
}
