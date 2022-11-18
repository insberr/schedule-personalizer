import { TopBar } from '../../components/TopBar';
import { store } from '../../storage';

export function SchedulePage() {
    return (
        <>
            <pre> {store.scs.value?.pretty()} </pre>
            <pre> {JSON.stringify(store.scs.value?.exec(), null, 4)} </pre>
        </>
    );
    // you definatly shouldnt use the SCS value directly, we should compute the users full merged schedule and use that
}
