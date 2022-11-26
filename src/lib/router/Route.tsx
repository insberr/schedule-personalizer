import React, { useEffect } from 'react';
import { store } from '../../storage';
import { Page } from '../../types';
//import { useRoute } from './hooks';

export type RouteProps = {
    routes: Page[];
    children: JSX.Element | JSX.Element[];
    unmount?: boolean;
};

export function Route(props: RouteProps) {
    return <span>{props.children}</span>;
    // const currentPage = store.route.value as Page;

    // if (props.hide) {
    //     return <span style={{ display: 'none' }}>{props.children}</span>;
    // } else {
    //     return <span />;
    // }
}

