import { SCS } from 'schedule-script';
import { store, StoreWrapper } from '../storage';
import * as _scheduleURL from '../../config/main.config.scs'; // url of the bundled scs, shouldnt change between versions
console.log('url', _scheduleURL);
const scheduleURL = new URL(_scheduleURL.default);
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
}, 30 * 1000);

update();

