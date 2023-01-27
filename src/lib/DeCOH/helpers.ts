import { format, parse, set } from 'date-fns';

export function mod_time(time: string, fn: (d: Date) => Date): string {
    let d = set(parse(time, 'HH:mm', new Date()), {
        milliseconds: 0,
        seconds: 0,
    });
    let newD = fn(d);
    return format(newD, 'HH:mm');
}
