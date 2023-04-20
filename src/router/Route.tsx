import { currentPage, Page } from '../storage/page';

export type RouteProps = {
    routes: Page[];
    children: JSX.Element | JSX.Element[];
    hide?: boolean;
};

export function Route(props: RouteProps) {
    
    if (props.routes.includes(currentPage.value)) {
        return <span>{props.children}</span>;
    } else {
        if (props.hide) {
            return <span style={{ display: 'none' }}>{props.children}</span>;
        } else {
            return <span />;
        }
    }
}
