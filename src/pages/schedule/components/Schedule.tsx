import { Stdata } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"
import { getCurrentTerm } from "../../../lib"

type ScheduleProps = {
    sch: Stdata
}

function Schedule(props: ScheduleProps) {
    console.log(props)
    // get current (viewed) trimester
    // get event and apply changes (if any)
    // make a value for todays schedule
    
    return (<Center>
        <div className="row justify-content-center">
            <Center className="date">Monday: 69/69/69</Center>
        </div>
        { props.sch.terms[getCurrentTerm(props.sch)].classes.map((period) => {
            return <ScheduleEntry key={period.period} period={period} />
        }) }
    </Center>)
}
export default Schedule