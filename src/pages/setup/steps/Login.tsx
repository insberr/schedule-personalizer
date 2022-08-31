import { useEffect, useId, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Center from '../../../components/Center';

import { Terms, emptyCL } from '../../../types';
import { FadeIn } from '../components/FadeIn';
//import { StorageQuery, setV5Data } from '../../../storageManager';

import * as api from '../../../apis/studentvue/studentVueAPI';
import * as settings from '../../../config/settings';
import { useDispatch } from 'react-redux';
import { setStudentVueData, setGotSchedules } from '../../../storage/studentvue';
import { useDebounce } from 'react-use';

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

    useDebounce(() => {
        if (username === "" || password === "") {
            setValidUser({ isValid: false, loading: false, name: "", school: "" })
            return
        }

        api.validateCredentials(username, password).then(res => {
            if (res) {
                // change text input to green
                // 
                console.log("valid credentioals");

                api.getStudentInfo(username, password).then(res => {
                    setValidUser({ isValid: true, loading: false, name: res.content.FormattedName, school: res.content.CurrentSchool });
                })
            } else {
                // change text input to red
                //
                console.log('invalid credentials');
                setValidUser({ isValid: false, loading: false, name: "", school: "" });
            }
        }).catch(err => { console.log('Validate Credentials Error In pages/setup/steps/Login.tsx: ' + err) });
    }, 1000, [username, password])

    async function Submit() {
        setLoading(true)
        hideError();

        // Set username and password to local storage so we can use them later
        dispatch(setStudentVueData({ password: password, username: username, stayLoggedIn: true, isLoggedIn: true, gotSchedules: false, lastRefresh: 0 }));

        // Validate user credentials to make sure the login info is correct
        const validCreds = await api.validateCredentials(username, password).then(res => {
            if (res) {
                // TODO: change text input to green
                // 
                console.log("valid credentioals");

                api.getStudentInfo(username, password).then(res => {
                    setValidUser({ isValid: true, loading: false, name: res.content.FormattedName, school: res.content.CurrentSchool });
                })
                return true;
            } else {
                // TODO: change text input to red
                //
                setValidUser({ isValid: false, loading: false, name: "", school: "" });
                console.log('invalid credentials');
                return false;
            }
        }).catch(err => {
            // TODO: handle this error and send to sentry
            console.log('Validate Credentials Error In pages/setup/steps/Login.tsx: ' + err);
            doError('Failed to validate user credentials: ' + err);
            return false;
        });

        if (!validCreds) {
            setLoading(false);
            return;
        }
        
        // Get student Schedule (if it fails continue to the schedule and notify the user that
        //   there was a problem fetching the schedule from studentvue and to wait for it to work)
        api.getAllSchedules(username, password).then(res => {
            dispatch(setGotSchedules(true))
            props.setSchedule(api.convertStudentvueDataToTerms(res));
            // change it to this, i think its better
            // dispatch(setTerms(res));
        }).catch(err => {
            // TODO: handle this error and send to sentry
            console.log('Get Student Schedule Error In pages/setup/steps/Login.tsx: ' + err);
            dispatch(setGotSchedules(false))

            // TODO: Log error to sentry
            console.log('No schedule was set, so temporay data is being used');

            // Set the schedule to temporary data
            const newTerms = settings.termsDates.map(t => {
                t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
                return t;
            });

            props.setSchedule(newTerms)
        });

        
        setLoading(false);
        props.setStage(69);
    }

    return (<FadeIn>
        <Center>
            <h1>Login with StudentVue</h1>
            <Alert variant="danger" dismissible onClose={() => { hideError() }} show={ errorshow }>
                {error}
            </Alert>
            <Form className="paper" onSubmit={ (evt) => { evt.preventDefault(); evt.stopPropagation(); Submit(); }}>
                <Form.Group className="mb-3">
                    <Form.FloatingLabel controlId={id+"username"} label="Username">
                        <Form.Control required placeholder="Username" disabled={loading} onChange={ (e) => { setValidUser({ ...validUser, loading: true }); setUsername(e.currentTarget.value) } } value={username} />
                    </Form.FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.FloatingLabel controlId={id+"password"} label="Password">
                        <Form.Control required placeholder="Password" disabled={loading} type="password" onChange={ (e) => { setValidUser({ ...validUser, loading: true }); setPassword(e.currentTarget.value)}} value={password} />
                    </Form.FloatingLabel>
                </Form.Group>
                { /* TODO: Add signup for alert emails check box */ }
                <Button variant='crimson' disabled={loading} type="submit">
                    { loading ? <Spinner as="span" animation="border" size="sm" /> : "Login" }
                </Button>
                <br /><br />
                <div>{ (username === '' || password === '') ? 'Please enter your username and password' : (validUser.loading) ? 'Loading...' : (validUser.isValid && validUser.loading === false) ? validUser.name + ' At ' + validUser.school: 'Invalid Credentails' }</div>
            </Form>
            <Button className="mt-5 white" onClick={ () => { props.setStage(-1) }} variant="crimson-link" size="sm">Enter data manually (Recommended For Teachers)</Button>
        </Center>
    </FadeIn>)
}
