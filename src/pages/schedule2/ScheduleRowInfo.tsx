import { isAfter } from 'date-fns';
import { Class, timeToDate } from '../../types';

export default function ScheduleRowInfo(props: { DisplayDate: Date; SPDisplayClass: Class; alt: boolean }) {
    const ClassStartTime = timeToDate(props.SPDisplayClass.startTime, props.DisplayDate);
    const ClassEndTime = timeToDate(props.SPDisplayClass.endTime, props.DisplayDate);
    const isNow = isAfter(props.DisplayDate, ClassStartTime) && isAfter(ClassEndTime, props.DisplayDate);

    return (
        <div className={'TextCenter'}>
            <div>Details about class, grades, and other stuff here</div>
            <div>
                <strong> Current Grade A+ (todo) </strong>
            </div>
            <div>
                <strong>
                    <a href={'mailto:' + 'teacher email'}>Email teacher name</a>
                </strong>
            </div>
            <div>
                <strong>Room number</strong>
            </div>
            <div>
                {isAfter(props.DisplayDate, ClassEndTime) ? (
                    <strong>Class Ended</strong>
                ) : (
                    <div>
                        <strong>{isNow ? 'Ending' : 'Beginning'} in</strong>
                        {/* <Countdown destDate={isNow ? endTime : startTime} /> */}
                    </div>
                )}
            </div>
            <div>{isNow ? <div>progress bar{/*<DateBar startDate={startTime} destDate={endTime} /> */}</div> : ''}</div>
        </div>
    );
}
