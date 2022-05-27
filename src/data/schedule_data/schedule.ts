// no touch

import { Time } from "../../types"
import { set } from 'date-fns'
import { objectify } from "@sentry/utils"
export type SchedulePeriod = {
  period: string,
  time: {
      start: Time
      end: Time
  },
  l?: string;
}

const DB = { // todo: make these actually do something.
    getSchDBEntry: (entry: string): Schedule => { return [] },
    setSchDBEntry: (entry: string, value: Schedule) => {return},
    getSchDB: (): Record<string, Schedule> => {return {}},

    getDayDBEntry: (entry: string): string | undefined => {return},
    setDayDBEntry: (entry: string, value: string) => {return},
}

export type Schedule = SchedulePeriod[];

// from https://stackoverflow.com/a/1349426
function makeid(length: number) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function haveSameData(o1: any, o2: any): boolean {
    return JSON.stringify(o1) == JSON.stringify(o2) // hacky, fix pls
}

const noTime = { hours: 0, minutes: 0, seconds: 0, milliseconds: 0}
class ScheduleData {
    async getSchedule(date: Date): Promise<Schedule | undefined> {
        const key = set(date, noTime).getTime().toString() 
        const dayEntry = DB.getDayDBEntry(key)
        if (!dayEntry) return;
        return DB.getSchDBEntry(dayEntry);
    }
    async setSchedule(date: Date, sch: Schedule) {
        const key = set(date,noTime).getTime().toString()
        const D = DB.getSchDB()
        let schKey = Object.keys(D).find((key) => {
            return haveSameData(D[key], sch)
        })
        if (!schKey) {
            schKey = makeid(32)
            DB.setSchDBEntry(schKey, sch)
        }
        DB.setDayDBEntry(key,schKey);
        // clean old entrys here

        return

    }
}
const sch = new ScheduleData()
export default sch