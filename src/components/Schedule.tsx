import Center from "./Center"
import ScheduleEntry from "./ScheduleEntry"

function Schedule() {
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