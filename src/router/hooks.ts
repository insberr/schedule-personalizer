import { useDispatch, useSelector } from "react-redux";
import { Page, page2url, route } from "../storage/page";
import { RootState } from "../storage/store";

export function useRoute() {
    const r = useSelector((state: RootState) => state.router.currentPage)
    return r;
}

export function useNavigate(): (p: Page) => void {
    const dispatch = useDispatch();
    return (p: Page) => {
        window.history.replaceState(null,"/",page2url(p));
        dispatch(route(p));
    }
}