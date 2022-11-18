import { store } from '../../storage';

export function SchedulePage() {
    return <pre> {store.scs.value?.pretty()} </pre>;
    // you definatly shouldnt use the SCS value directly, we should compute the users full merged schedule and use that
}
