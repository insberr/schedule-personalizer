import { store } from '../../storage';

// Components
import { ModeSwitcher } from '../../components/ModeSwitcher';

// SCS And JSON Tree
import { JSONTree } from 'react-json-tree';
import { SCS } from 'schedule-script';

export function SettingsPage() {
    return (
        <div>
            <h1> Settings </h1>
            <div>Set? Ings?</div>
            <ModeSwitcher />
            <div>Figure out how to use router or something for seperating these ...</div>
            <JSONTree
                data={(store.scs.value as SCS)?.scheduleFor({
                    date: new Date(),
                    user: { classes: [], grade: '12', schoolName: 'bethel_high' },
                })}
            />
            <pre> {store.scs.value?.pretty()} </pre>
            <pre> {JSON.stringify(store.scs.value?.exec(), null, 4)} </pre>
        </div>
    );
}

