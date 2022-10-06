import JsBarcode from "jsbarcode";
import { Button } from "react-bootstrap";
import { useNavigate } from "../../router/hooks";
import { Page } from "../../storage/page";
import { useStudentvue } from "../../storage/studentvue";
import { useCallback, useEffect, useId, useRef } from "react"
import Center from "../../components/Center";
import { useSTV } from "../../storage/studentvueData";
//mport { notDeepEqual } from "assert";

export function StudentID() {
    const navigate = useNavigate();
    const stv = useStudentvue();
    const stvInfo = useSTV();
    //const barcoder = useRef<JsBarcode.api>()
    const id = useId().replace(":","C")
    /*const box = useCallback((node: HTMLDivElement) => {
        barcoder.current = JsBarcode(node)
    },[])*/
    const barcode = useCallback((node: any) => {
        if (node) {
            JsBarcode(node, stv.username, {format:"code39", height: 40});
        }
    }, [stv.username])
    /*useEffect(() => {
        const barcoder = JsBarcode("#"+id)
        barcoder.CODE39(stv.username)
    }, [stv.username,id])*/
    return (<>
    <Center>
        <h2>Student ID</h2>
        <div>Working Progress</div>
        <div>Student Identification: { stv.username }</div>
        <div>Name: { stvInfo.info?.content?.FormattedName }</div>
        <div>Grade: { stvInfo.info?.content?.Grade }</div>
        <div>Birthday: { stvInfo.info?.content?.BirthDate } </div>
        <svg ref={barcode}></svg>
        <br /><Button onClick={() => { navigate(Page.SCHEDULE) }}>Back to schedule</Button>
    </Center>
    </>)
}