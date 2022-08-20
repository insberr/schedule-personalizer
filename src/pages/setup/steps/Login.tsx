import { useId, useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Center from '../../../components/Center';

import { Terms, ClassIDS } from '../../../types';
import { FadeIn } from '../components/FadeIn';
//import { StorageQuery, setV5Data } from '../../../storageManager';

import * as api from '../../../studentVueAPI';
import * as settings from '../../../config/settings';
import { useDispatch } from 'react-redux';
import { useStudentvue, StorageDataStudentvue, setStudentVueData } from '../../../storage/studentvue';

type Props = {
    setStage:  (stage: number) => void;
    setSchedule: (schedule: Terms) => void
    // setTerms: (terms: Terms[]) => void;
}

//type changeevt = FormEvent<HTMLInputElement>;
export function Login(props: Props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string>("")
    const [errorshow, showError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [validUser, setValidUser] = useState<{ isValid: boolean, loading: boolean, name: string, school: string }>({ isValid: true, loading: true, name: "", school: "" })
    const id = useId()
    const dispatch = useDispatch()

    function doError(err: string) {
        setError(err)
        showError(true)
    }

    function hideError() {
        showError(false)
    }

    useEffect(() => {
        if (username !== "" && password !== "") {
            api.validateCredentials(username, password).then(res => {
                if (res) {
                    // change text input to green
                    // 
                    console.log("valid credentioals");

                    api.getStudentInfo(username, password).then(res => {
                        console.log(res);
                        setValidUser({ isValid: true, loading: false, name: res.content.FormattedName, school: res.content.CurrentSchool });
                    })
                } else {
                    // change text input to red
                    //
                    console.log('invalid credentials');
                    setValidUser({ isValid: false, loading: true, name: "", school: "" });
                }
            }).catch(err => { console.log('Validate Credentials Error In pages/setup/steps/Login.tsx: ' + err) });
        }
    }, [username, password])

    function Submit() {
        // ADD LATER: Check if user exists

        // Set username and password to local storage
        dispatch(setStudentVueData({ password: password, username: username, stayLoggedIn: true, isLoggedIn: true }));

        // Initial validation check
        if (validUser.isValid === false) {
            doError("There was an error logging in. Make sure the credentials are correct or try again later.");
        }

        // Validate user credentials (check again because why the hell not)

        // Get student Schedule (if it fails continue to the schedule and notify the user that
        //   there was a problem fetching the schedule from studentvue and to wait for it to work)


        setLoading(true)
        hideError();

        
        setLoading(false)


        // somehow change this?
        // setV5Data()



        // set the schedule from studentvue. it wont work right now so heres some made up data
        api.getAllSchedules(username, password).then((res) => {
            console.log(res);
            // const formattedTerms = res.map((term) => { /* uhhh just waiting for our schedules to be published in studentvue */ })
        })
        
        const newTerms = settings.termsDates;

        /* TEMPOARY UNTILL STUDENTVUE GET SCHEDULES WORKS */
        newTerms[0].classes = [
            { classID: ClassIDS.Advisory, period: 0, name: "Advisory", teacher: { name: "Nail", email: "", id: "" }, room: "111" },
            { classID: ClassIDS.Period, period: 1, name: "Math", teacher: { name: "Screw", email: "", id: "" }, room: "222" },
            { classID: ClassIDS.Period, period: 2, name: "ELA", teacher: { name: "Spoon", email: "", id: "" }, room: "333" },
            { classID: ClassIDS.Period, period: 3, name: "Science", teacher: { name: "Pencil", email: "", id: "" }, room: "444" },
            { classID: ClassIDS.Period, period: 4, name: "PE", teacher: { name: "Glue", email: "", id: "" }, room: "555" },
            { classID: ClassIDS.Period, period: 5, name: "Band", teacher: { name: "Trumpet", email: "", id: "" }, room: "666" },
        ]
        newTerms[1].classes = [
            { classID: ClassIDS.Advisory, period: 0, name: "Advisory", teacher: { name: "Nail", email: "", id: "" }, room: "111" },
            { classID: ClassIDS.Period, period: 1, name: "Math", teacher: { name: "Screw", email: "", id: "" }, room: "222" },
            { classID: ClassIDS.Period, period: 2, name: "ELA", teacher: { name: "Spoon", email: "", id: "" }, room: "333" },
            { classID: ClassIDS.Period, period: 3, name: "Science", teacher: { name: "Pencil", email: "", id: "" }, room: "444" },
            { classID: ClassIDS.Period, period: 4, name: "PE", teacher: { name: "Glue", email: "", id: "" }, room: "555" },
            { classID: ClassIDS.Period, period: 5, name: "Band", teacher: { name: "Trumpet", email: "", id: "" }, room: "666" },
        ]
        newTerms[2].classes = [
            { classID: ClassIDS.Advisory, period: 0, name: "Advisory", teacher: { name: "Nail", email: "", id: "" }, room: "111" },
            { classID: ClassIDS.Period, period: 1, name: "Math", teacher: { name: "Screw", email: "", id: "" }, room: "222" },
            { classID: ClassIDS.Period, period: 2, name: "ELA", teacher: { name: "Spoon", email: "", id: "" }, room: "333" },
            { classID: ClassIDS.Period, period: 3, name: "Science", teacher: { name: "Pencil", email: "", id: "" }, room: "444" },
            { classID: ClassIDS.Period, period: 4, name: "PE", teacher: { name: "Glue", email: "", id: "" }, room: "555" },
            { classID: ClassIDS.Period, period: 5, name: "Band", teacher: { name: "Trumpet", email: "", id: "" }, room: "666" },
        ]
        /* END TEMPORARY */

        props.setSchedule(newTerms);

        props.setStage(69);

        /*
        setTimeout(() => {
            doError("Haha you thought i actually implemented this lmafo")
            setLoading(false)
            setV5Data(StorageQuery.Setup, true)
            
        }, 5000);
        */
        
    }
    return (<FadeIn><Center className="full-center mt-5">
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
            <br /><br />
            <div>{ (validUser.isValid && validUser.loading === false) ? validUser.name + ' At ' + validUser.school: 'Invalid Credentials' }</div>
        </Form>
    <Button className="mt-5 white" onClick={ () => { props.setStage(-1) }} variant="link" size="sm">Enter data manually (Not recommended)</Button>
    </Center></FadeIn>)
    // For enter manually we should add a "are you sure alert" also warning them that the lunch will not be auto detected. we should figure out a way on events to display a message saying that lunch may not be correct because of event
}
