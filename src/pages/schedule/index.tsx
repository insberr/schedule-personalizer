import { CL, Class, getTimeW } from "../../types";
import Schedule from "./components/Schedule";

type SchedulePageProps = {
    sch: CL[]
}

function SchedulePage(props: SchedulePageProps) {
    return <Schedule sch={ TempMerge(props.sch) }/> // todo: convert the schedule from CL[] to Class[], by merging it with the data in the database/studentvue data
}

function TempMerge(sch: CL[]): Class[] {
    return sch.map((cl, i) => {
        return {
            period: (i == 0 ? 8 : i-1).toString(), // TODO: BAD BAD BAD BAD
            name: cl.name,
            teacher: {
                name: cl.teacher.name,
                email: "",
                id: cl.teacher.id
            },
            room: cl.room,
            startTime: getTimeW(7,0,0),
            endTime: getTimeW(14,0,0)
        }
    })
}
export default SchedulePage