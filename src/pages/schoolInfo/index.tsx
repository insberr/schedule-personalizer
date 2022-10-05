import { Button } from "react-bootstrap";
import { useNavigate } from "../../router/hooks";
import { Page } from "../../storage/page";
import { useSTV } from "../../storage/studentvueData";

export function SchoolInfo() {
    const navigate = useNavigate();
    const stv = useSTV()

    return (<>
        <div>Working Progress</div>
        <div>You Go To <strong>{ stv.info?.content?.CurrentSchool }</strong></div>
        <Button onClick={() => { navigate(Page.SCHEDULE) }}>Back to schedule</Button>
    </>)
}
