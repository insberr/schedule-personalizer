import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Center from '../../../components/Center';
import { LunchPicker } from '../components/LunchPicker';
import { ManualClassEntry } from '../components/ManualClassEntry';
import { CL, ClassIDS, emptyCL, StageProps, Terms, Term } from '../../../types';
import { useDispatch } from "react-redux";
import { setLunch, useSchedule } from '../../../storage/schedule';
import * as settings from '../../../config/settings';
import Form from 'react-bootstrap/Form';

//import { StorageQuery, setV5Data, Terms } from '../../../storageManager';

type Props = StageProps & {
    setSchedule: (schedule: Terms) => void
}

export function Manual(props: Props) {
    const classAmount = settings.numberOfPeriods;
    const sch = useSchedule();
    const [term, setTerm] = useState<number>(0);
    const [terms, setTerms] = useState<Terms>(() => sch.terms.length > 0 ? sch.terms : settings.termsDates)
    const [l, sl] = useState(0);

    const dispatch = useDispatch();
    
    const isValid = true;
    useEffect(() => {
        console.log('lunch ' + l)
        dispatch(setLunch(l))
    }, [l])

    if (terms[0].classes.length < 1) {
        terms.map(t => {
            t.classes = emptyCL(settings.numberOfPeriods);
            t.classes[0] = {
                ...t.classes[0],
                classID: ClassIDS.Advisory,
                name: "Advisory",
            }
            return t;
        })
    }

    function setClass(classNum: number, clas: CL) {
        const newTerms = [...terms];
        newTerms[term].classes[classNum] = clas;
        setTerms(newTerms);
    }
    console.log(terms)
    return (
        <Center className="text-center"> 
            <h1 className="mb-3">Setup</h1>
            <Form.Select value={term} onChange={(n) => {setTerm(parseInt(n.target.value)); console.log("set term to "+n.target.value)}}  aria-label="Term Select">
                { 
                    terms.map((t, i) => {
                        return <option key={"term"+i} value={t.termIndex}>Term {t.termIndex + 1}</option>
                    })
                }
            </Form.Select>
            <div className="paper">
                {[...Array(classAmount)].map((_, i) => {
                    return <ManualClassEntry  value={terms[term].classes[i]} change={ (c: CL) => {setClass(i,c)} } isAdv={i==0} period={i} key={"class"+i} />
                })}
            <div className="mb-3">
                <LunchPicker l={l} lunchamt={3} setl={sl} />
            </div>
            <div className="mb-3">
                { isValid ? "" : <Alert variant="danger">You need to fill out all boxes</Alert>}
                <Button onClick={()=>{props.setSchedule(terms); props.setStage(69)}} disabled={!isValid}>Confirm</Button>
            </div>
            <pre className="paperer text-start">
                {JSON.stringify(terms, null, 4)}
            </pre>
            </div>
        </Center>
    )

}