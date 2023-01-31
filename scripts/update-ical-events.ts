import { readFile } from 'fs/promises';
import readline from 'readline/promises';
//@ts-ignore
import { serify, deserify } from '@karmaniverous/serify-deserify';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
import json5 from 'json5';
import icalJS from 'node-ical';
import { join } from 'path';
import { format, isWithinInterval, set, subMilliseconds } from 'date-fns';
import { MasterSettings, SchoolScheduleConfig } from '$types';
import { chain } from 'lodash';
// python my beloved
let ical = './scripts/school-calandar.ics'; // you could also fetch a url here but i dont care.
let configLocation = fs_for('/config/master.json5');
let school = 'Bethel High School';
function fs_for(url: string) {
    return new URL(join('..', 'static', url), import.meta.url);
}

async function iter_dates(
    start: Date,
    end: Date,
    fn: (d: Date) => Promise<void>
) {
    let d = set(start, { seconds: 0, milliseconds: 0, minutes: 0, hours: 0 });
    while (d <= end) {
        await fn(d);
        d.setDate(d.getDate() + 1);
    }
}

function isEvent(d: icalJS.CalendarComponent): d is icalJS.VEvent {
    return d.type == 'VEVENT';
}

function cdate(date: Date) {
    return date;
}

function format_date(d: Date) {
    return format(d, 'MM/dd/yyyy');
}

async function main() {
    let conf = (await readFile(configLocation, 'utf-8').then(
        json5.parse
    )) as MasterSettings;
    let schoolConfig = conf.schools.find((s) => s.stvName == school);
    let cache = new Map<string, string>();
    if (schoolConfig == undefined) {
        throw new Error('School not found');
    }
    let school_schedule_config = (await readFile(
        fs_for(schoolConfig.scheduleURL),
        'utf-8'
    )
        .then(json5.parse)
        .then(deserify)) as SchoolScheduleConfig;
    let ICAL = await readFile(ical, 'utf-8');
    let parsed = await icalJS.async.parseICS(ICAL);
    let events: icalJS.VEvent[] = Object.values(parsed).filter(isEvent);
    console.log(events);

    let start = new Date(schoolConfig.terms[0].start);
    let end = new Date(schoolConfig.terms[schoolConfig.terms.length - 1].end);
    await iter_dates(start, end, async (d) => {
        await Promise.all(
            events.map(async (e) => {
                let end_evt = subMilliseconds(e.end, 1);
                if (isWithinInterval(d, { start: e.start, end: end_evt })) {
                    //console.log(format_date(d), e.summary, e.description);
                    if (!cache.has(e.summary)) {
                        let sch: string;
                        while (true) {
                            sch = await rl.question(
                                `${e.summary} -> which schedule? (leave blank for no change)`
                            );
                            if (sch != '') {
                                if (
                                    school_schedule_config.schedules[sch] ==
                                    undefined
                                ) {
                                    console.error(`Schedule ${sch} not found`);
                                } else {
                                    break;
                                }
                            } else {
                                break;
                            }
                        }
                        cache.set(e.summary, sch);
                    }
                    let dt = cache.get(e.summary);
                    if (dt != '') {
                        console.log(
                            `Setting ${e.summary} to ${dt} on ${format_date(d)}`
                        );
                        school_schedule_config.events.set(
                            format(d, 'MM-dd-yyyy'),
                            {
                                schedule: dt,
                                message: e.summary,
                            }
                        );
                    }
                }
            })
        );
    });
    console.log(json5.stringify(serify(school_schedule_config), null, 4));
}
main().then(() => rl.close());
