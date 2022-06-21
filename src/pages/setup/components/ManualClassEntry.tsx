import { useState, useId } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from 'react-bootstrap/Form'

export function ManualClassEntry() {
    const id = useId()
    const [classname, setclassname] = useState("")
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
            Period name goes here (maybe with some styling) (id: {id})
            <Row>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"classname"} label="Class Name"> 
                        <Form.Control type="text" onChange={changeDo(setclassname)} value={classname} placeholder="Class Name" />
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