import { useState, useId } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from 'react-bootstrap/Form'

type Props = {
    isAdv: boolean
    period: number
}

export function ManualClassEntry(props: Props) {
    const id = useId()
    const [classname, setclassname] = useState(props.isAdv ? "Advisory" : "")
    const [teacher, setteacher] = useState("")
    const [room, setroom] = useState("")
    function changeDo(setfunc: (v: string) => void) {
        return (e: any) => { // use a better type
            setfunc(e.currentTarget.value)
        }
    }
    // mayne convert the floatinglabel+control combo into a component
    return (
        <Container className="paperer mb-4">
            <div className="mb-2">{ props.isAdv ? "Advisory" : "Period "+props.period}</div>
            <Row>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"classname"} label="Class Name"> 
                        <Form.Control type="text" onChange={changeDo(setclassname)} value={classname} placeholder="Class Name" disabled={props.isAdv} />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"tname"} label="Teacher Name">
                        <Form.Control value={teacher} onChange={changeDo(setteacher)} placeholder="Teacher Name" />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"room"} label="Room Number">
                        <Form.Control value={room} onChange={changeDo(setroom)} placeholder="Room Number" />
                    </Form.FloatingLabel>
                </Form.Group>
            </Row>
        </Container>
    )
}