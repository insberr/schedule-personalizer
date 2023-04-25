import { ComponentChildren } from 'preact';
import { Page, currentPage } from '../storage/page';

export type RouteProps = {
    routes: Page[];
    children: ComponentChildren;
    hide?: boolean;
};

export function Route(props: RouteProps) {
    if (props.routes.includes(currentPage.value)) {
        return <>{props.children}</>;
    } else {
        if (props.hide) {
            return <span style={{ display: 'none' }}>{props.children}</span>;
        } else {
            return <></>;
        }
    }
}
