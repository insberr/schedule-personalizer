import { Stdata } from "../../types";
import Schedule from "./components/Schedule";

type SchedulePageProps = {
    sch: Stdata
}

function SchedulePage(props: SchedulePageProps) {
    return <Schedule sch={ props.sch }/>
}
export default SchedulePage