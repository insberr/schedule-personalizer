import { ClassIDS, type CollapsedEvent } from '$types';
import { subMinutes } from 'date-fns/fp';
import { mod_time } from './helpers';
import { lunch_override } from './lunch_override';

export type ovrType = (evt: CollapsedEvent, settings: any, date: Date) => void;

export const overrides: { [key: string]: ovrType } = {
    cutAndAddTest: test1,
    lunch: lunch_override,
};

function test1(evt: CollapsedEvent, settings: any, _: Date) {
    let endT = evt.schedule.periods[0].end;
    let endT2 = evt.schedule.periods[1].start;
    evt.schedule.periods[0].end = mod_time(endT, subMinutes(30));
    evt.schedule.periods.splice(1, 0, {
        id: ClassIDS.Assembly,
        num: -1,
        start: mod_time(endT, subMinutes(25)),
        end: mod_time(endT2, subMinutes(5)),
    });
}
