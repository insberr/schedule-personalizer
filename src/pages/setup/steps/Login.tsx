import { useEffect, useId, useState } from 'preact/hooks';

import { Button, Alert, Stack, TextField, FormGroup, Box, Paper, Typography, AlertTitle, Collapse, CircularProgress } from '@mui/material';
// import Alert from 'react-bootstrap/Alert';
// import Spinner from 'react-bootstrap/Spinner';
// import Form from 'react-bootstrap/Form';

import Center from '../../../components/Center';

import { Terms, emptyCL } from '../../../types';
import { FadeIn } from '../components/FadeIn';

import * as api from '../../../apis/studentvue/studentVueAPI';
import * as settings from '../../../config/settings';

import { studentVueCredentials, isStudentVue } from '../../../storage/studentvue';
import { useDebounce } from 'react-use';
// import { Container, Row, Stack } from 'react-bootstrap';
import { scheduleDataTerms } from '../../../storage/schedule';
import { ComponentChildren } from 'preact';
import { SetupSteps } from '..';
import BoldHTag from '../../../components/BoldHTag';

type Props = {
    setStage: (stage: number) => void;
};

// TEMPORARY
const Row = (props: { children: ComponentChildren }) => <div className="row">{props.children}</div>;
const Spinner = (props: { as: string; animation: string; size: string }) => <div className="spinner">spinner {props.as}</div>;
const Container = (props: { children: ComponentChildren; className: string }) => <div className="container">{props.children}</div>;
const Form = (props: { children: ComponentChildren; className: string; onSubmit: (event: any) => void }) => (
    <div className="form">{props.children}</div>
);

export function Login(props: Props) {
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
        studentVueCredentials.value = { username, password };
        // dispatch(
        //     setStudentVueData({
        //         password: password,
        //         username: username,
        //         stayLoggedIn: false,
        //         isLoggedIn: false,
        //         gotSchedules: false,
        //         lastRefresh: 0,
        //     })
        // );

        // Validate user credentials to make sure the login info is correct
        const validCreds = await api
            .validateCredentials(username, password)
            .then((validateCredentialsResponse) => {
                if (validateCredentialsResponse) {
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
        isStudentVue.value = true;
        // dispatch(
        //     setStudentVueData({
        //         password: password,
        //         username: username,
        //         stayLoggedIn: true,
        //         isLoggedIn: true,
        //         gotSchedules: false,
        //         lastRefresh: 0,
        //     })
        // );

        // Get student Schedule (if it fails continue to the schedule and notify the user that
        //   there was a problem fetching the schedule from studentvue and to wait for it to work)
        await api
            .getAllSchedules(username, password)
            .then((res) => {
                // dispatch(setGotSchedules(true));
                // ! Add set got schedules
                scheduleDataTerms.value = api.convertStudentvueDataToTerms(res);
            })
            .catch((err) => {
                console.log('Get Student Schedule Error In pages/setup/steps/Login.tsx: ' + err);
                // dispatch(setGotSchedules(false));
                // ! Add set got schedules

                console.log('No schedule was set, so temporay data is being used');

                // Set the schedule to temporary data
                const newTerms = settings.termsDates.map((settingsTerm) => {
                    settingsTerm.classes = emptyCL(settings.numberOfPeriods, settings.hasAdvisory);
                    return settingsTerm;
                });

                scheduleDataTerms.value = newTerms;
            });

        setLoading(false);
        props.setStage(SetupSteps.Schedule);
    }

    return (
        <FadeIn>
            <Center>
                <BoldHTag varient="h5" gutterBottom sx={{ marginTop: 5 }}>
                    Login with StudentVue
                </BoldHTag>

                {/* validUser.isValid && validUser.loading === false */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            padding: '20px',
                            width: 'fit-content',
                            height: 'fit-content',
                        },
                    }}
                >
                    <Paper
                        elevation={10}
                        background={{ color: '#222222' }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            error={username !== '' && password !== '' ? !validUser.isValid && validUser.loading === false : false}
                            helperText={
                                username !== '' && password !== '' ? (!validUser.isValid && validUser.loading === false ? 'Invalid' : '') : ''
                            }
                            margin="normal"
                            id={id + 'username'}
                            label="Username"
                            variant="standard"
                            type="username"
                            required
                            focused
                            disabled={loading}
                            placeholder="Enter Username"
                            onChange={(usernameTextFieldOnChangeEvent) => {
                                setValidUser({ ...validUser, loading: true });
                                setUsername(usernameTextFieldOnChangeEvent.currentTarget.value);
                            }}
                            value={username}
                        />
                        <TextField
                            error={username !== '' && password !== '' ? !validUser.isValid && validUser.loading === false : false}
                            helperText={
                                username !== '' && password !== '' ? (!validUser.isValid && validUser.loading === false ? 'Invalid' : '') : ''
                            }
                            color={
                                username !== '' && password !== ''
                                    ? !validUser.isValid && validUser.loading === false
                                        ? 'primary'
                                        : 'success'
                                    : 'primary'
                            }
                            focused
                            margin="normal"
                            id={id + 'password'}
                            label="Password"
                            variant="standard"
                            type="password"
                            required
                            disabled={loading}
                            placeholder="Enter Password"
                            onChange={(passwordTextFieldOnChangeEvent) => {
                                setValidUser({ ...validUser, loading: true });
                                setPassword(passwordTextFieldOnChangeEvent.currentTarget.value);
                            }}
                            value={password}
                        />
                        <Box sx={{ position: 'relative' }}>
                            <Button
                                className="mt-3"
                                variant="contained"
                                color="primary"
                                disabled={loading || !['', settings.forSchoolName].includes(validUser.school)}
                                onClick={() => {
                                    Submit();
                                }}
                            >
                                Login
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={25}
                                    color="success"
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Box>
                    </Paper>
                </Box>
                <Collapse in={errorshow}>
                    <Alert
                        severity="error"
                        variant="outlined"
                        onClose={() => {
                            hideError();
                        }}
                    >
                        <AlertTitle>StudentVue Error</AlertTitle>
                        {error}
                    </Alert>
                </Collapse>
                <Collapse in={username !== '' && password !== '' ? validUser.isValid && loading === false : false}>
                    <Alert severity="success">
                        Welcome {validUser.name} At {validUser.school}
                    </Alert>
                </Collapse>
                {/* TO DO: Add signup for alert emails check box */}
                <Button
                    className="mt-5 underline"
                    onClick={() => {
                        props.setStage(SetupSteps.Manual);
                    }}
                    variant="text"
                >
                    Enter data manually (Recommended For Teachers)
                </Button>
            </Center>
        </FadeIn>
    );
}
