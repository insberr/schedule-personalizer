import { Stdata } from "../../../types"
import Center from "../../../components/Center"
import ScheduleEntry from "./ScheduleEntry"

type ScheduleProps = {
    sch: Stdata
}

function Schedule(props: ScheduleProps) {
    console.log(props)
    return (<Center>
        <div className="row justify-content-center">
            <Center className="date">Monday: 69/69/69</Center>
        </div>
        <ScheduleEntry />
        <ScheduleEntry />
        <ScheduleEntry />
        <ScheduleEntry />
        <ScheduleEntry />
        <ScheduleEntry />
    </Center>)
}
export default Schedule