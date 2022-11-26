import { SettingsButton } from '../../components/SettingsButton';
import { store } from '../../storage';
import { Page, Tab } from '../../types';
import { ModeSwitcher } from '../../components/ModeSwitcher';

import RestoreIcon from '@mui/icons-material/Restore';
import { JSONTree } from 'react-json-tree';
import { SCS } from 'schedule-script';
import { RouterBlock } from '../../lib/router/RouterBlock';
import { Route } from '../../lib/router/Route';

export function SettingsPage(props: { defaultTabs: Tab[]; setTabs: (tabs: Tab[]) => void }) {
    return (
        <div>
            <h1> Settings </h1>
            <div>Set? Ings?</div>
            <ModeSwitcher />
            <div>Figure out how to use router or something for seperating these ...</div>
            <JSONTree
                data={(store.scs.value as SCS)?.scheduleFor({
                    date: new Date(),
                    user: { classes: [], grade: '12', schoolName: 'Bethel High School' },
                })}
            />
            <pre> {store.scs.value?.pretty()} </pre>
            <pre> {JSON.stringify(store.scs.value?.exec(), null, 4)} </pre>
        </div>
    );
}

