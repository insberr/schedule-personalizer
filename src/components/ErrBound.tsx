import { Typography } from '@mui/material';
import { Component, ErrorInfo } from 'react';
type props = { children: JSX.Element | JSX.Element[] };
type state = { hasError: boolean };

export class Err extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_: Error) {
        // Update state so the next render will show the fallback UI.
        console.error(_);
        return { hasError: true };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidCatch(_q: Error, _e: ErrorInfo) {
        // You can also log the error to an error reporting service
        // console.error(error, errorInfo);
        // sentry should also go here. How Do You Do This?
    }

    render() {
        if (this.state.hasError) {
            //  You can render any custom fallback UI
            return (
                <Typography variant="h5">
                    Something went wrong, Please try again later. <br /> If you are a developer, check the console for more details <br />
                    <a href="https://forms.gle/kwhHzBReokA3EEEd8">Feedback form</a>
                </Typography>
            );
        }

        return this.props.children;
    }
}