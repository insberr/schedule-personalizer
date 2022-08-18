import { Component, ErrorInfo } from "react";
type props = { children: any };
type state = { hasError: boolean };

export class Err extends Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        // console.error(error, errorInfo);
        // sentry should also go here. How Do You Do This?
    }

    render() {
        if (this.state.hasError) {
            //  You can render any custom fallback UI
            return (
                <h3 className="text-center full-center">
                    Something went wrong, Please try again later. <br /> If you
                    are a developer, check the console for more details{" "}
                </h3>
            );
        }

        return this.props.children;
    }
}
