import { Page } from '../storage/page';

export type RouteProps = {
    routes: Page[];
    children: JSX.Element | JSX.Element[];
    hide?: boolean;
};

export function Route(props: RouteProps) {
    const pageValue = Page.SCHEDULE;
    if (props.routes.includes(pageValue)) {
        return <span>{props.children}</span>;
    } else {
        if (props.hide) {
            return <span style={{ display: 'none' }}>{props.children}</span>;
        } else {
            return <span />;
        }
    }
}
