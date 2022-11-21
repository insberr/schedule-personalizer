import { store } from '../../storage';
import { Page } from '../../types';
//import { useRoute } from './hooks';

export type RouteProps = {
    routes: Page[];
    children: JSX.Element | JSX.Element[];
    hide?: boolean;
};

export function Route(props: RouteProps) {
    const currentPage = store.route.value as Page;

    if (props.routes.includes(currentPage)) {
        return <span>{props.children}</span>;
    } else {
        if (props.hide) {
            return <span style={{ display: 'none' }}>{props.children}</span>;
        } else {
            return <span />;
        }
    }
}

