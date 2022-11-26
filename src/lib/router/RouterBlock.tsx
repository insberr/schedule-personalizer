import { store } from '../../storage';
import { Page } from '../../types';
//import { useRoute } from './hooks';

export function RouterBlock(props: { children: JSX.Element | JSX.Element[] }) {
    const currentPage = store.route.value as Page;

    if ((props.children as JSX.Element[]).length !== undefined) {
        const pages = (props.children as JSX.Element[])
            .filter((a) => a.props.routes.includes(currentPage) || a.props.unmount === false)
            .map((a, i) => {
                if (a.props.unmount !== undefined) {
                    const display = a.props.routes.includes(currentPage) ? 'block' : 'none';
                    if (a.props.unmount === false) {
                        return (
                            <span style={{ display }} key={i}>
                                {a.props.children}
                            </span>
                        );
                    }
                    return <span key={i}>This Should Never Display</span>;
                }
                return a;
            });
        const nopage = (props.children as JSX.Element[]).filter((a) => a.props.routes.includes(Page.nopage));
        if (pages.length === 0) {
            if (nopage.length === 0) return <span>No page for {currentPage}</span>;
            return <span>{nopage}</span>;
        }
        return <div>{pages}</div>;
    } else {
        return <span>{props.children}</span>;
    }
}

