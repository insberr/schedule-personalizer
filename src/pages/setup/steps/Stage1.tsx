import { useId, useState, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"
import Center from '../../../components/Center'
import { Stages } from "../types";
import { CL } from "../types"
type Props = {
    setStage:  (stage: number) => void;
    setSchedule: (schedule: CL[]) => void
}
//type changeevt = FormEvent<HTMLInputElement>;
export function Stage1(props: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string>("")
    const [errorshow, showError] = useState(false)
    const [loading, setLoading] = useState(false)
    const id = useId()
    function doError(err: string) {
        setError(err)
        showError(true)
    }
    function hideError() {
        showError(false)
    }
    function Submit() {
        setLoading(true)
        hideError();
        setTimeout(() => {
            doError("Haha you thought i actually implemented this lmafo")
            setLoading(false)
        }, 5000);
    }
    return (<Center>
        <h1>Login with StudentVue</h1>
        <br />
        <Alert variant="danger" dismissible onClose={() => { hideError() }} show={ errorshow }>
            {error}
        </Alert>
        <br />
        <Form className="paper" onSubmit={ (evt) => { evt.preventDefault(); evt.stopPropagation(); Submit() }}>
            <Form.Group className="mb-3">
                <Form.FloatingLabel controlId={id+"username"} label="Username">
                    <Form.Control placeholder="Username" disabled={loading} onChange={ (e) => { setUsername(e.currentTarget.value) } } value={username} />
                </Form.FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.FloatingLabel controlId={id+"password"} label="Password">
                    <Form.Control placeholder="Password" disabled={loading} type="password" onChange={ (e) => {setPassword(e.currentTarget.value)}} value={password} />
                </Form.FloatingLabel>
            </Form.Group>
            <Button disabled={loading} type="submit">
                { loading ? <Spinner as="span" animation="border" size="sm" /> : "Login" }
            </Button>
    </Form>
    
    </Center>)
}