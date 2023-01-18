import type { MasterSettingsSchool, Matcher, OptionalMatcher } from '$types';
import { isWithinInterval, isSameDay, isAfter } from 'date-fns';
export function collapseMatcher<T>(
    matcher: OptionalMatcher<T>,
    cfg: MasterSettingsSchool,
    date: Date
): T {
    let endDate = cfg.terms
        .map((r) => new Date(r.end))
        .sort((b, a) => (isAfter(a, b) ? 1 : isSameDay(a, b) ? 0 : -1))[0];
    if (isMatcher(matcher)) {
        switch (matcher.matchtype) {
            case 'DOW':
                switch (date.getDay()) {
                    case 0:
                        return matcher.sun;
                    case 1:
                        return matcher.mon;
                    case 2:
                        return matcher.tue;
                    case 3:
                        return matcher.wed;
                    case 4:
                        return matcher.thu;
                    case 5:
                        return matcher.fri;
                    case 6:
                        return matcher.sat;
                    default:
                        throw new Error('Invalid day of week');
                }
            case 'TERM':
                let currentTerm = cfg.terms.findIndex((term) => {
                    let start = new Date(term.start);
                    let end = new Date(term.end);
                    return isWithinInterval(date, { start, end });
                });
                if (currentTerm == undefined) {
                    currentTerm = isAfter(date, endDate)
                        ? cfg.terms.length - 1
                        : 0;
                }
                return matcher[currentTerm] as T;
            default:
                return matcher;
        }
    } else {
        return matcher;
    }
}

function isMatcher<T>(matcher: OptionalMatcher<T>): matcher is Matcher<T> {
    return Object.hasOwnProperty.call(matcher, 'matchtype');
}
