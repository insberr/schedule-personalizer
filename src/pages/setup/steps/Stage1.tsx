import { useId, useState, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import { Stdata } from "../../../types";
import Center from '../../../components/Center'
type Props = {
    setStage:  (stage: number) => void;
    setSchedule: (schedule: Stdata | undefined) => void
}
//type changeevt = FormEvent<HTMLInputElement>;
export function Stage1(props: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const id = useId()
    function Submit() {
        alert("piss")
    }
    return (<Center>
        <h1>Login with StudentVue</h1>
        <br />
        <Form onSubmit={ (evt) => { evt.preventDefault(); evt.stopPropagation(); Submit() }}>
            <Form.Group className="mb-3">
                <Form.FloatingLabel controlId={id+"username"} label="Username">
                    <Form.Control onChange={ (e) => { setUsername(e.currentTarget.value) } } value={username} placeholder="" />
                </Form.FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.FloatingLabel controlId={id+"password"} label="Password">
                    <Form.Control type="password" onChange={ (e) => {setPassword(e.currentTarget.value)}} value={password} />
                </Form.FloatingLabel>
            </Form.Group>
            <Button type="submit">
                Login
            </Button>
    </Form>
    
    </Center>)
}