import { useState, useId } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from 'react-bootstrap/Form'

export function ManualClassEntry() {
    const id = useId()
    const [classname, setclassname] = useState("")
    // mayne convert the floatinglabel+control combo into a component
    return (
        <Container className="shader-bg mb-4 p-3 rounded">
            Period name goes here (maybe with some styling)
            <Row>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"classname"} label="Class Name"> 
                        <Form.Control type="text" placeholder="Class Name" />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"tname"} label="Teacher Name">
                        <Form.Control placeholder="Teacher Name" />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.FloatingLabel controlId={id+"room"} label="Room Number">
                        <Form.Control placeholder="Room Number" />
                    </Form.FloatingLabel>
                </Form.Group>
            </Row>
        </Container>
    )
}