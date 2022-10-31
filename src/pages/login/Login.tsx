import { useEffect, useId, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import Center from '../../components/Center';

import { emptyCL } from '../../types';
import { FadeIn } from '../setup/components/FadeIn';

import * as api from '../../apis/studentvue/studentVueAPI';
import * as settings from '../../config/settings';
import { useDispatch } from 'react-redux';
import { setStudentVueData, setGotSchedules } from '../../storage/studentvue';
import { useDebounce } from 'react-use';
import { Container, Row, Stack } from 'react-bootstrap';

import { useNavigate } from '../../router/hooks';
import { Page } from '../../storage/page';
import { setTerms } from '../../storage/schedule';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [errorshow, showError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [validUser, setValidUser] = useState<{
        isValid: boolean;
        loading: boolean;
        name: string;
        school: string;
    }>({ isValid: true, loading: true, name: '', school: '' });
    const id = useId();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function doError(err: string) {
        setError(err);
        showError(true);
    }

    function hideError() {
        showError(false);
    }

    useEffect(() => {
        if (!['', settings.forSchoolName].includes(validUser.school)) {
            // maybe add a list of links with school names
            doError(
                `Unfortunately, this instance of Schedule Personalizer is for ${settings.forSchoolName}. Please make sure you are using the correct url for your school!`
            );
        }
    }, [validUser]);

    useDebounce(
        () => {
            if (username === '' || password === '') {
                setValidUser({ isValid: false, loading: false, name: '', school: '' });
                return;
            }

            api.validateCredentials(username, password)
                .then((res) => {
                    if (res) {
                        api.getStudentInfo(username, password).then((res) => {
                            setValidUser({
                                isValid: true,
                                loading: false,
                                name: res.content.FormattedName,
                                school: res.content.CurrentSchool,
                            });
                        });
                    } else {
                        setValidUser({ isValid: false, loading: false, name: '', school: '' });
                    }
                })
                .catch((err) => {
                    console.log('Validate Credentials Error In pages/setup/steps/Login.tsx: ' + err);
                });
        },
        300,
        [username, password]
    );

    async function Submit() {
        setLoading(true);
        hideError();

        // Set username and password to local storage so we can use them later
        dispatch(
            setStudentVueData({
                password: password,
                username: username,
                stayLoggedIn: false,
                isLoggedIn: false,
                gotSchedules: false,
                lastRefresh: 0,
            })
        );

        // Validate user credentials to make sure the login info is correct
        const validCreds = await api
            .validateCredentials(username, password)
            .then((res) => {
                if (res) {
                    api.getStudentInfo(username, password).then((res) => {
                        setValidUser({
                            isValid: true,
                            loading: false,
                            name: res.content.FormattedName,
                            school: res.content.CurrentSchool,
                        });
                    });
                    return true;
                } else {
                    setValidUser({ isValid: false, loading: false, name: '', school: '' });
                    return false;
                }
            })
            .catch((err) => {
                console.log('Validate Credentials Error In pages/setup/steps/Login.tsx: ' + err);
                doError('Failed to validate user credentials: ' + err);
                return false;
            });

        if (!validCreds) {
            setLoading(false);
            return;
        }

        // Set isLogged in and stayLoggedIn to true
        dispatch(
            setStudentVueData({
                password: password,
                username: username,
                stayLoggedIn: true,
                isLoggedIn: true,
                gotSchedules: false,
                lastRefresh: 0,
            })
        );

        // Get student Schedule (if it fails continue to the schedule and notify the user that
        //   there was a problem fetching the schedule from studentvue and to wait for it to work)
        await api
            .getAllSchedules(username, password)
            .then((res) => {
                dispatch(setGotSchedules(true));
                dispatch(setTerms(api.convertStudentvueDataToTerms(res)));
                // props.setSchedule(api.convertStudentvueDataToTerms(res));
            })
            .catch((err) => {
                console.log('Get Student Schedule Error In pages/setup/steps/Login.tsx: ' + err);
                dispatch(setGotSchedules(false));

                console.log('No schedule was set, so temporay data is being used');

                // Set the schedule to temporary data
                const newTerms = settings.termsDates.map((t) => {
                    t.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
                    return t;
                });

                dispatch(setTerms(newTerms));
                // props.setSchedule(newTerms);
            });

        setLoading(false);
        navigate(Page.SCHEDULE);
        // props.setStage(69);
    }

    return (
        <FadeIn>
            <Center>
                <h1 className="mt-5">Login with StudentVue</h1>

                <Alert
                    variant="danger"
                    dismissible
                    onClose={() => {
                        hideError();
                    }}
                    show={errorshow}
                >
                    {error}
                </Alert>

                <Container className="mt-5">
                    <Row>
                        <Form
                            className="paper"
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                Submit();
                            }}
                        >
                            <Stack gap={3}>
                                <Form.FloatingLabel controlId={id + 'username'} label="Username" className="uncenter-floating-label">
                                    <Form.Control
                                        required
                                        placeholder="Username"
                                        disabled={loading}
                                        onChange={(e) => {
                                            setValidUser({ ...validUser, loading: true });
                                            setUsername(e.currentTarget.value);
                                        }}
                                        value={username}
                                    />
                                </Form.FloatingLabel>

                                <Form.FloatingLabel controlId={id + 'password'} label="Password" className="uncenter-floating-label">
                                    <Form.Control
                                        required
                                        placeholder="Password"
                                        disabled={loading}
                                        type="password"
                                        onChange={(e) => {
                                            setValidUser({ ...validUser, loading: true });
                                            setPassword(e.currentTarget.value);
                                        }}
                                        value={password}
                                    />
                                </Form.FloatingLabel>
                            </Stack>
                            {/* TO DO: Add signup for alert emails check box */}
                            <Button
                                className="mt-3"
                                variant="crimson"
                                disabled={loading || !['', settings.forSchoolName].includes(validUser.school)}
                                type="submit"
                            >
                                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Login'}
                            </Button>
                            <div className="mt-3">
                                {username === '' || password === ''
                                    ? 'Please enter your username and password'
                                    : validUser.loading
                                    ? 'Loading...'
                                    : validUser.isValid && validUser.loading === false
                                    ? validUser.name + ' At ' + validUser.school
                                    : 'Invalid Credentails'}
                            </div>
                        </Form>
                    </Row>
                    <Row>
                        <Button
                            className="mt-5 underline"
                            onClick={() => {
                                // props.setStage(-1);
                                navigate(Page.SETTINGS);
                            }}
                            variant="btn-crimson"
                            size="sm"
                        >
                            Back To Settings
                        </Button>
                    </Row>
                </Container>
            </Center>
        </FadeIn>
    );
}
