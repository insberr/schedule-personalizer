import { useState, useId, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from 'react-bootstrap/Form'
import { CL } from "../types";
import { ClassIDS } from "../../../types"
import parseWithOptions from "date-fns/esm/fp/parseWithOptions/index.js";

type Props = {
    isAdv: boolean
    period: number
    change: (d: CL) => void
}

export function ManualClassEntry(props: Props) {
    const id = useId()
    const [classname, setclassname] = useState(props.isAdv ? "Advisory" : "")
    const [teacher, setteacher] = useState("")
    const [room, setroom] = useState("")
    function pushSCH() {
        const data: CL = {
            classID: props.isAdv ? ClassIDS.Advisory : ClassIDS.Period,
            period: props.period,
            name: props.isAdv ? "Advisory" : classname,
            teacher: {
                name: teacher,
                id: ""
            },
            room
        }
        props.change(data);
    }
    function changeDo(setfunc: (v: string) => void) {
        return (e: any) => { // use a better type
            setfunc(e.currentTarget.value);
        }
    }
    useEffect(pushSCH, [classname,teacher,room])
    // mayne convert the floatinglabel+control combo into a component
    return (
        <Container className="paperer mb-4">
            <div className="mb-2">{ props.isAdv ? "Advisory" : "Period "+props.period}</div>
            <Row>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"classname"} label="Name"> 
                        <Form.Control type="text" onChange={changeDo(setclassname)} value={classname} placeholder="Name" disabled={props.isAdv} />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"tname"} label="Teacher">
                        <Form.Control value={teacher} onChange={changeDo(setteacher)} placeholder="Teacher" />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"room"} label="Room">
                        <Form.Control value={room} onChange={changeDo(setroom)} placeholder="Room" />
                    </Form.FloatingLabel>
                </Form.Group>
            </Row>
        </Container>
    )
}