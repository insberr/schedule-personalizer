import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Center from '../../../components/Center';
import { LunchPicker } from '../components/LunchPicker';
import { ManualClassEntry } from '../components/ManualClassEntry';
import { CL, ClassIDS, emptyCL, StageProps, Terms } from '../../../types';
import { useDispatch } from "react-redux";
import { setLunch, useSchedule } from '../../../storage/schedule';
import * as settings from '../../../config/settings';
import Form from 'react-bootstrap/Form';
import { Col, Container, FloatingLabel, Row } from 'react-bootstrap';

type Props = {
    setStage: (stage: number) => void;
    setSchedule: (schedule: Terms) => void;
    isEdit?: boolean;
    setIsEdit?: (isEdit: boolean) => void;
}

export function Manual(props: Props) {
    const classAmount = settings.numberOfPeriods;
    const sch = useSchedule();
    const [term, setTerm] = useState<number>(0);
    const [terms, setTerms] = useState<Terms>(() => sch.terms.length > 0 ? sch.terms : settings.termsDates)
    const [l, sl] = useState(sch.lunch || 1);

    const dispatch = useDispatch();
    
    const isValid = true;
    useEffect(() => {
        console.log('lunch ' + l)
        dispatch(setLunch(l))
    }, [l])

    if (terms[0].classes.length < 1) {
        terms.map(t => {
            t.classes = emptyCL(settings.numberOfPeriods, false);
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

    return (
        <Center className="text-center"> 
            <h1 className="mt-5">Setup</h1>
            <Button variant='crimson' className={ props.isEdit ? 'hidden' : 'mt-5' } onClick={()=>{ props.setStage(420) }}>Back To Login</Button>
            <Container className='mt-5'>
                <Row lg={2} className='justify-content-center'>
                    <Form.Group controlId="formSelectTerm">
                        <FloatingLabel controlId="formSelectTerm" label="Select Term" className="uncenter-floating-label">
                            <Form.Select value={term} onChange={(n) => {setTerm(parseInt(n.target.value)); console.log("set term to "+n.target.value)}}  aria-label="Term Select">
                                { 
                                    terms.map((t, i) => {
                                        return <option key={"term"+i} value={t.termIndex}>Term {t.termIndex + 1}</option>
                                    })
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="paper mt-4" style={{'maxWidth': '1000px'}}>
                    {[...Array(classAmount)].map((_, i) => {
                        return <ManualClassEntry  value={terms[term].classes[i]} change={ (c: CL) => {setClass(i,c)} } isAdv={i==0} period={i} key={"class"+i} />
                    })}
                </Row>
                <Row className="mt-4">
                    <LunchPicker l={l} lunchamt={3} setl={sl} />
                </Row>
                <Row className="mt-4 mb-5">
                    <Col>
                        { isValid ? "" : <Alert variant="danger">You need to fill out all boxes</Alert>}
                        <Button variant='crimson' onClick={()=>{ props.setSchedule(terms); props.isEdit ? (props as { setIsEdit: (s: boolean) => void }).setIsEdit(false) : props.setStage(69); }} disabled={!isValid}>Confirm</Button>
                    </Col>
                </Row>
            </Container>
        </Center>
    )

}