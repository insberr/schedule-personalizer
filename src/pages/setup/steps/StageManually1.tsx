import { useEffect, useId, useMemo, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Center from "../../../components/Center";
import { LunchPicker } from "../components/LunchPicker";
import { ManualClassEntry } from "../components/ManualClassEntry";
import { CL, emptyCL, ManualResult, StageProps } from "../types";
import { Stdata, schObject, ClassIDS } from "../../../types";
import { fixLunch } from "../../../lib"

type Props = StageProps & {
    setSchedule: (schedule: CL[]) => void
}

/* NOTE: please make the 'sch' an object that is 
{
    classes: CL[].
    lunch: number
}
(lunch should be a number between 1 and however many lunches there are)
so we can pass the lunch info to the merger

Idk how to make this code function off the CL[] in an object and also change the lunch value in the object when the lunch is changed

*/

export function StageManually1(props: Props) {
    const classAmount = 6;
    const [classes, setClasses] = useState<CL[]>(emptyCL(classAmount))
    const [l, sl] = useState(0);
    const resultData: ManualResult = useMemo<ManualResult>(() => {
        return {
            lunch: l, // lunch should probably be detected in the merger that merges the schedule with the manual input, convert this to id?
            classes: classes
        }
    }, [classes, l])
    const isValid = true;
    useEffect(() => {
        if (classes[0].name != "Advisory") {
            const newg = [...classes][0];
            newg.classID = ClassIDS.Advisory
            newg.name = "Advisory"
            setClass(0,newg)
        }
    }, [classes])
    function setClass(classNum: number, clas: CL) {
        const newv = [...classes];
        newv[classNum] = clas
        setClasses(newv);
    }
    return (
        <Center className="text-center"> 
            <h1 className="mb-3">Setup</h1>
            <div className="paper">
            {[...Array(classAmount)].map((_, i) => {
                return <ManualClassEntry change={ (c: CL) => {setClass(i,c)} } isAdv={i==0} period={i} key={"class"+i} />
            })}
            <div className="mb-3">
                <LunchPicker l={l} lunchamt={3} setl={sl} />
            </div>
            <div className="mb-3">
                { isValid ? "" : <Alert variant="danger">You need to fill out all boxes</Alert>}
                <Button onClick={()=>{props.setSchedule(fixLunch(classes, l)); props.setStage(69)}} disabled={!isValid}>Confirm</Button>
            </div>
            <pre className="paperer text-start">
                {JSON.stringify(fixLunch(classes, l), null, 4)}
            </pre>
            </div>
        </Center>
        )

}