import { today } from "../lib/today";
import { set } from "date-fns";

export function dateToTime(d: Date): Time {
  return {
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds(),
  };
}

export function timeToDate(t: Time, d?: Date): Date {
  if (!d) {
    d = today();
  }
  return set(d, t);
}

export function getTimeW(h: number, m: number, s = 0): Time {
  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
}

export type Time = {
  hours: number;
  minutes: number;
  seconds?: number;
};
