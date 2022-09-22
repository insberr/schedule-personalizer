import { Button } from "react-bootstrap";
import { useNavigate } from "../../router/hooks";
import { Page } from "../../storage/page";
import { useStudentvue } from "../../storage/studentvue";

export function StudentID() {
    const navigate = useNavigate();
    const stv = useStudentvue();

    return (<>
        <div>Working Progress</div>
        <div>Student Number: { stv.username }</div>
        <div>Make a barcode thingy</div>
        <Button onClick={() => { navigate(Page.SCHEDULE) }}>Back to schedule</Button>
    </>)
}