import { format, parse } from 'date-fns';

export function mod_time(time: string, fn: (d: Date) => Date): string {
    let d = parse(time, 'HH:mm', new Date());
    let newD = fn(d);
    return format(newD, 'HH:mm');
}
