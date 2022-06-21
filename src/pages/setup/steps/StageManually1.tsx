import { useEffect, useId, useMemo, useState } from "react";
import Center from "../../../components/Center";
import { LunchPicker } from "../components/LunchPicker";
import { ManualClassEntry } from "../components/ManualClassEntry";
import { CL, emptyCL, ManualResult, StageProps } from "../types";


export function StageManually1(props: StageProps) {
    const classAmount = 6;
    const [classes, setClasses] = useState<CL[]>(emptyCL(classAmount))
    const [l, sl] = useState(0);
    const resultData: ManualResult = useMemo<ManualResult>(() => {
        return {
            lunch: l,
            classes: classes
        }
    }, [classes, l])
    useEffect(() => {
        if (classes[0].name != "Advisory") {
            const newg = {...classes[0]}
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
                submit button goes here
            </div>
            <pre className="paperer text-start">
                {JSON.stringify(resultData, null, 4)}
            </pre>
            </div>
        </Center>
        )

}