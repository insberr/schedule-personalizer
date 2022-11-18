import { SCS } from 'schedule-script';
import { store, StoreWrapper } from '../storage';

const scheduleURL = new URL('../../config/bethel/bethel.scs', import.meta.url);
scheduleURL.search = '';

const heads = new Headers();
heads.append('pragma', 'no-cache');
heads.append('cache-control', 'no-cache');

async function update() {
    const scsStore = store.scs as StoreWrapper<SCS | null>;
    const resp = await fetch(scheduleURL, { headers: heads });
    const text = await resp.text();
    const NSCS = new SCS(text);
    scsStore.value = NSCS;
}

setInterval(() => {
    update();
}, 5000);

update();
