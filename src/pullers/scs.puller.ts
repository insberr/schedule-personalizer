import { SCS } from 'schedule-script';
import { store, StoreWrapper } from '../storage';
import _scheduleURL from '../../config/main.config.scs'; // url of the bundled scs, shouldnt change between versions
console.log('url', _scheduleURL);

let scscode: null | string = null;
if (_scheduleURL.serverMoment === null) {
    scscode = _scheduleURL.code;
}

let scheduleURL: null | URL = null;
if (scscode === null) {
    scheduleURL = new URL(_scheduleURL);
    scheduleURL.search = '';
}

const heads = new Headers();
heads.append('pragma', 'no-cache');
heads.append('cache-control', 'no-cache');

async function update() {
    const scsStore = store.scs as StoreWrapper<SCS | null>;
    if (scheduleURL !== null) {
        const resp = await fetch(scheduleURL, { headers: heads });
        const text = await resp.text();
        const NSCS = new SCS(text);
        scsStore.value = NSCS;
        return;
    }
    if (scscode !== null) {
        const NSCS = new SCS(scscode);
        scsStore.value = NSCS;
        return;
    }
}

setInterval(() => {
    update();
}, 30 * 1000);

update();

