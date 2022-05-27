import { Time } from "../../types"

export type SchedulePeriod = {
  period: string,
  time: {
      start: Time
      end: Time
  },
  l?: string;
}

export type Schedule = SchedulePeriod[];

class ScheduleData {
    async getSchedule(date: Date): Promise<Schedule | undefined> {
        return []
    }
    async setSchedule(date: Date, sch: Schedule) {
        return;
    }
}
const sch = new ScheduleData()
export default sch