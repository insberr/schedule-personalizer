import { store } from '../../storage';

export function SchedulePage() {
    return <pre> {store.scs.value?.pretty()} </pre>;
}
