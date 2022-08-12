import { CL, Class, getTimeW, schObject } from "../../types";
import Schedule from "./components/Schedule";
import { Schedules } from '../../schedules';

type SchedulePageProps = {
    sch: CL[]
}

function SchedulePage(props: SchedulePageProps) {
    return <Schedule sch={ TempMerge(props.sch) }/> // todo: convert the schedule from CL[] to Class[], by merging it with the data in the database/studentvue data
}


function TempMerge(sch: CL[]): Class[] {
    const scheduleForDisplay: Class[] = [];

    for (const period of Schedules.normal.classes) {
        const periodNeeded = sch.filter(p => (p.classID === period.classID) && (p.period === period.period));
        const h: Class = {
            classID: period.classID,
            period: period.period,
            name: periodNeeded[0]?.name || "",
            room: periodNeeded[0]?.room || "",
            teacher: {
                name: periodNeeded[0]?.teacher.name || "",
                email: /* periodNeeded[0]?.teacher.email || "" */ "example@gmail.com",
                id: periodNeeded[0]?.teacher.id || ""
            },
            startTime: period.startTime,
            endTime: period.endTime
        }
        scheduleForDisplay.push(h)
    }

    return scheduleForDisplay;
    /*
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
    */
}
export default SchedulePage