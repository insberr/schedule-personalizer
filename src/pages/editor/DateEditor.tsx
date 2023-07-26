import { isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { DateRange } from '../../config/events';

type Props = {
    setDate: (date: Date | DateRange) => void;
    date: Date | DateRange;
};

export function DateEditor(props: Props) {
    return (
        <div>
            <h2> Date Editor </h2>
            <Calendar
                className={''}
                value={(props.date as DateRange)?.start ? [(props.date as DateRange)?.start, (props.date as DateRange)?.end] : (props.date as Date)}
                selectRange={true}
                onChange={(date: Value) => {
                    if (date === null) return;
                    if (!Array.isArray(date)) return;

                    const newDate = date as Date[]; // This is why I dislike typescript.
                    if (isSameDay(newDate[0], newDate[1])) {
                        props.setDate(newDate[0]);
                    } else {
                        props.setDate({ start: newDate[0], end: newDate[1] });
                    }
                }}
            ></Calendar>
        </div>
    );
}
