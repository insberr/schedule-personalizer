import { Stdata } from "../types"
import Center from "./Center"
import ScheduleEntry from "./ScheduleEntry"

type ScheduleProps = {
    sch: Stdata
}

function Schedule(props: ScheduleProps) {
    console.log(props)
    // get current (viewed) trimester
    // get event and apply changes (if any)
    // make a value for todays schedule
    const rows: JSX.Element[] = [];
    for (const period of props.sch.terms[2].classes) {
        rows.push(<ScheduleEntry key={period.period} period={period} />);
    }

    console.log(rows)
    
    return (<Center>
        <div className="row justify-content-center">
            <Center className="date">Monday: 69/69/69</Center>
        </div>
        {[rows]}
    </Center>)
}
export default Schedule