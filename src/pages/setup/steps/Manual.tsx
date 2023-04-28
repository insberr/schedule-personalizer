import { useEffect, useState } from 'preact/hooks';

import * as settings from '../../../config/settings';

// Types
import { CL, emptyCL } from '../../../types';

import { scheduleDataTerms, computedScheduleForDisplay, userLunch } from '../../../storage/schedule';

// Components
import Center from '../../../components/Center';
import { LunchPicker } from '../components/LunchPicker';
import { ManualClassEntry } from '../components/ManualClassEntry';

// import { Col, Container, FloatingLabel, Row } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
import { Button, Alert } from '@mui/material';
import { Page, currentPage } from '../../../storage/page';
import { SetupSteps, setupStep } from '..';

type Props = {
    // setSchedule: (schedule: Terms) => void;
    // setIsEdit?: (isEdit: boolean) => void;
    isEdit?: boolean;
};

export function Manual(props: Props) {
    const classAmount = settings.numberOfPeriods;
    const [term, setTerm] = useState<number>(0);
    // const [terms, setTermsD] = useState<Terms>(() => sch.terms.length > 0 ? sch.terms : settings.termsDates)
    const [l, sl] = useState(userLunch.value || 1);

    const isValid = true;
    useEffect(() => {
        console.log('lunch ' + l);
        userLunch.value = l;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [l]);

    if (scheduleDataTerms.value.length === 0) {
        console.log('this shouldnt run,, ever. EVER. IF IT RUNS YOU WILL BE FIRED');
        settings.termsDates.map((term) => {
            term.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
            return term;
        });
    }

    function setClass(classNum: number, clas: CL) {
        const newTerms = [...scheduleDataTerms.peek()];
        newTerms[term].classes[classNum] = clas;

        // setTermsD(newTerms);
        scheduleDataTerms.value = newTerms;
    }

    return (
        <Center className="text-center">
            <h1 className="mt-5">Setup</h1>
            <Button
                variant="contained"
                className={props.isEdit ? 'hidden' : 'mt-5'}
                onClick={() => {
                    setupStep.value = SetupSteps.Login;
                }}
            >
                Back To Login
            </Button>
            <Container className="mt-5">
                <Row lg={2} className="justify-content-center">
                    <Form.Group controlId="formSelectTerm">
                        <FloatingLabel controlId="formSelectTerm" label="Select Term" className="uncenter-floating-label">
                            <Form.Select
                                value={term}
                                onChange={(n) => {
                                    setTerm(parseInt(n.target.value));
                                    console.log('set term to ' + n.target.value);
                                }}
                                aria-label="Term Select"
                            >
                                {scheduleDataTerms.value.map((t, i) => {
                                    return (
                                        <option key={'term' + i} value={t.termIndex}>
                                            Term {t.termIndex + 1}
                                        </option>
                                    );
                                })}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="paper mt-4" style={{ maxWidth: '1000px' }}>
                    {[...Array(classAmount)].map((_, i) => {
                        return (
                            <ManualClassEntry
                                value={scheduleDataTerms.value[term].classes[i]}
                                change={(c: CL) => {
                                    setClass(i, c);
                                }}
                                isAdv={i == 0}
                                period={i}
                                key={'class' + i}
                            />
                        );
                    })}
                </Row>
                <Row className="mt-4">
                    <LunchPicker l={l} lunchamt={3} setl={sl} />
                </Row>
                <Row className="mt-4 mb-5">
                    <Col>
                        {isValid ? '' : <Alert variant="danger">You need to fill out all boxes</Alert>}
                        <Button
                            variant="crimson"
                            onClick={() => {
                                props.isEdit ? (currentPage.value = Page.SETTINGS) : (setupStep.value = SetupSteps.Schedule);
                            }}
                            disabled={!isValid}
                        >
                            Confirm
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Center>
    );
}
