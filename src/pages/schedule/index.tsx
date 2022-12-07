import { ClassIDS, getTimeW } from '../../types';
import { TopBar } from '../../components/TopBar';
import { store } from '../../storage';
import { Schedule } from '../../components/schedule';
import { JSONTree } from 'react-json-tree';
import { SCS } from 'schedule-script';
import { funny_number, get_schedule_for_display, TestObj, test_js_obj, test_struct_obj } from 'backend';

export function SchedulePage() {
    return (
        <>
            <Schedule
                clses={[
                    {
                        classID: ClassIDS.Period,
                        name: 'Period 1',
                        period: 1,
                        teacher: {
                            name: 'Mr. Teacher 1',
                            email: '',
                            id: '',
                        },
                        room: 'Room 1',
                        startTime: getTimeW(8, 0, 0),
                        endTime: getTimeW(8, 45, 0),
                    },
                    {
                        classID: ClassIDS.Period,
                        name: 'Period 2',
                        period: 2,
                        teacher: {
                            name: 'Mr. Teacher 2',
                            email: '',
                            id: '',
                        },
                        room: 'Room 2',
                        startTime: getTimeW(8, 0, 0),
                        endTime: getTimeW(8, 45, 0),
                    },
                    {
                        classID: ClassIDS.Period,
                        name: 'Period 3',
                        period: 3,
                        teacher: {
                            name: 'Mr. Teacher 3',
                            email: '',
                            id: '',
                        },
                        room: 'Room 3',
                        startTime: getTimeW(8, 0, 0),
                        endTime: getTimeW(8, 45, 0),
                    },
                ]}
            />
            <p>The funny number from rust: &apos;{funny_number()}&apos;</p>
            <p>{get_schedule_for_display('test')}</p>
            <p>{test_js_obj({ name: 'hello' })}</p>
            <p>{ (() => {
                const test = new TestObj();
                test.name = 'rusty dusty'
                return test_struct_obj(test);
            })() }</p>
        </>
    );
    // you definatly shouldnt use the SCS value directly, we should compute the users full merged schedule and use that
}

