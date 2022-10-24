import { isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
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
                onChange={(date: Date[]) => {
                    if (isSameDay(date[0], date[1])) {
                        props.setDate(date[0]);
                    } else {
                        props.setDate({ start: date[0], end: date[1] });
                    }
                }}
            ></Calendar>
        </div>
    );
}
