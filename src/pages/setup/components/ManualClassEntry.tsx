import { useId } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Form from 'react-bootstrap/Form'
import { CL } from "../../../types"

type Props = {
    isAdv: boolean
    period: number
    change: (d: CL) => void
    value: CL
}

export function ManualClassEntry(props: Props) {
    const id = useId()
    
    function changeDo(tomas: string) {
        return (evt: any) => {
            let val = evt.target.value
            if (tomas == "teacher") {
                val = {
                    name: val,
                    email: "",
                    id: ""
                }
            }
            props.change({
                ...props.value,
                [tomas]: val
            })
        }
    }
    // mayne convert the floatinglabel+control combo into a component
    return (
        <Container className="paperer mb-4" fluid>
            <div className="mb-2">{ props.isAdv ? "Advisory" : "Period "+props.period}</div>
            <Row xs={1} md={3}>
                <Form.Group as={Col} className='mb-3'>
                    <Form.FloatingLabel controlId={id+"classname"} label="Class Name" className="uncenter-floating-label"> 
                        <Form.Control type="text" onChange={changeDo("name")} value={props.value.name} placeholder="Name" disabled={props.isAdv} />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} className='mb-3'>
                    <Form.FloatingLabel controlId={id+"tname"} label="Teacher Name" className="uncenter-floating-label">
                        <Form.Control value={props.value.teacher.name} onChange={changeDo("teacher")} placeholder="Teacher" />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} className='mb-3'>
                    <Form.FloatingLabel controlId={id+"room"} label="Room Number" className="uncenter-floating-label">
                        <Form.Control value={props.value.room} onChange={changeDo("room")} placeholder="Room" />
                    </Form.FloatingLabel>
                </Form.Group>
            </Row>
        </Container>
    )
}