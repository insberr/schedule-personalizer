import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Center from '../../../components/Center';
import { LunchPicker } from '../components/LunchPicker';
import { ManualClassEntry } from '../components/ManualClassEntry';
import { CL, ClassIDS, emptyCL, StageProps, Terms } from '../../../types';
import { useDispatch } from "react-redux";
import { setLunch } from '../../../storage/schedule';


//import { StorageQuery, setV5Data, Terms } from '../../../storageManager';

type Props = StageProps & {
    setSchedule: (schedule: Terms) => void
}

export function Manual(props: Props) {
    const classAmount = 6;
    const [classes, setClasses] = useState<CL[]>(emptyCL(classAmount))
    const [l, sl] = useState(0);
    const dispatch = useDispatch();
    /*
    const resultData: ManualResult = useMemo<ManualResult>(() => {
        return {
            lunch: l, // lunch should probably be detected in the merger that merges the schedule with the manual input, convert this to id?
            classes: classes
        }
    }, [classes, l])
    */
    const isValid = true;
    useEffect(() => {
        if (classes[0].name != "Advisory") {
            const newg = [...classes][0];
            newg.classID = ClassIDS.Advisory
            newg.name = "Advisory"
            setClass(0,newg)
        }
    }, [classes])
    useEffect(() => {
        console.log('lunch ' + l)
        dispatch(setLunch(l))
    }, [l])

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
                <Button onClick={()=>{props.setSchedule([ { termIndex: 1, classes: classes, startDate: new Date(), endDate: new Date() }, { termIndex: 2, classes: classes, startDate: new Date(), endDate: new Date() }, { termIndex: 3, classes: classes, startDate: new Date(), endDate: new Date() } ]); props.setStage(69)}} disabled={!isValid}>Confirm</Button>
            </div>
            <pre className="paperer text-start">
                {JSON.stringify(classes, null, 4)}
            </pre>
            </div>
        </Center>
    )

}