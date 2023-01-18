import { writable, get } from 'svelte/store';
import { manualTerms } from '$lib/store/manual';
import { configURL } from '$lib/settings';
import { join } from 'path';
import {
    masterSettings,
    schoolName,
    schoolSettings,
    scheduleConfig,
} from '$lib/store/masterSettings';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import json5 from 'json5';
import { MasterSettingsSchema } from '$types';
import { waitForDownloadedSchedule } from '$lib/waitFor';
import { DeCOH } from '$lib/DeCOH';

//@ts-ignore
global.fetch = jest.fn((url: string) => {
    let fl = join(__dirname, '..', 'static', url);
    console.log('fetch:', url, '->', fl);
    if (existsSync(fl)) {
        return Promise.resolve({
            text: () => readFile(fl, 'utf-8'),
        });
    } else {
        throw new Error('File not found: ' + fl);
    }
});

beforeAll(async () => {
    let dt = await (await fetch(configURL)).text();
    let data = json5.parse(dt);
    let dataParsed = await MasterSettingsSchema.validate(data);
    masterSettings.set(dataParsed);
    schoolName.set('Second Test School');
    manualTerms.set([
        {
            startDate: new Date('2022-09-06T07:00:00.000Z'),
            endDate: new Date('2022-12-06T08:00:00.000Z'),
            termIndex: 0,
            classes: [
                {
                    classID: 4,
                    period: 0,
                    name: '111',
                    teacher: {
                        name: '112',
                        email: '',
                        id: '',
                    },
                    room: '113',
                },
                {
                    classID: 4,
                    period: 1,
                    name: '121',
                    teacher: {
                        name: '122',
                        email: '',
                        id: '',
                    },
                    room: '123',
                },
                {
                    classID: 4,
                    period: 2,
                    name: '131',
                    teacher: {
                        name: '132',
                        email: '',
                        id: '',
                    },
                    room: '133',
                },
            ],
        },
        {
            startDate: new Date('2022-12-08T08:00:00.000Z'),
            endDate: new Date('2023-06-23T07:00:00.000Z'),
            termIndex: 1,
            classes: [
                {
                    classID: 4,
                    period: 0,
                    name: '211',
                    teacher: {
                        name: '212',
                        email: '',
                        id: '',
                    },
                    room: '213',
                },
                {
                    classID: 4,
                    period: 1,
                    name: '221',
                    teacher: {
                        name: '222',
                        email: '',
                        id: '',
                    },
                    room: '223',
                },
                {
                    classID: 4,
                    period: 2,
                    name: '231',
                    teacher: {
                        name: '232',
                        email: '',
                        id: '',
                    },
                    room: '233',
                },
            ],
        },
    ]);
    await waitForDownloadedSchedule();
}, 15 * 1000);

afterAll(() => {
    //@ts-ignore
    schoolName.set(undefined);
    // @ts-ignore
    masterSettings.set(undefined);
});

describe('Sanity checks', () => {
    it('svelte stores can be written to, and read from.', () => {
        let store = writable(false);
        store.set(true);
        expect(get(store)).toBe(true);
    }),
        it('masterSettings has data set from beforeAll', () => {
            expect(get(masterSettings)).not.toBe(undefined);
        });
    it('masterSettings should be well formed', async () => {
        let data = get(masterSettings);
        await MasterSettingsSchema.validate(data);
    });
    it('school schedule config should be loaded', () => {
        expect(get(scheduleConfig)).not.toBe(undefined);
    });
    it('2 + 2 = 4', () => {
        expect(2 + 2).toBe(4);
    });
});

// two types of tests, derived tests, and regular tests
// derive tests write to stores, and check the output for the correct value,
// regular tests just call lib functions with certain inputs, and check the output for the correct value

describe('Derived tests', () => {});

describe('Regular tests', () => {
    it('DeCOH', () => {
        DeCOH(
            new Date('1/18/2023'),
            get(scheduleConfig),
            get(schoolSettings),
            get(manualTerms)
        );
    });
});

export {};
