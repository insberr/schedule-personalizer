import JsBarcode from "jsbarcode";
import { Button } from "react-bootstrap";
import { useNavigate } from "../../router/hooks";
import { Page } from "../../storage/page";
import { useStudentvue } from "../../storage/studentvue";
import { useCallback, useEffect, useId, useRef } from "react"
//mport { notDeepEqual } from "assert";
export function StudentID() {
    const navigate = useNavigate();
    const stv = useStudentvue();
    //const barcoder = useRef<JsBarcode.api>()
    const id = useId().replace(":","C")
    /*const box = useCallback((node: HTMLDivElement) => {
        barcoder.current = JsBarcode(node)
    },[])*/
    const barcode = useCallback((node: any) => {
        if (node) {
            JsBarcode(node, stv.username, {format:"code39"});
        }
    }, [stv.username])
    /*useEffect(() => {
        const barcoder = JsBarcode("#"+id)
        barcoder.CODE39(stv.username)
    }, [stv.username,id])*/
    return (<>
        <div>Working Progress</div>
        <div>Student Number: { stv.username }</div>
        <canvas ref={barcode}></canvas>
        <Button onClick={() => { navigate(Page.SCHEDULE) }}>Back to schedule</Button>
    </>)
}