import { isAfter } from 'date-fns';
import { Class, timeToDate } from '../../types';
import { LinearProgress } from '@mui/material';
import { useGrades } from '../../storage/studentVueGrades';

export default function ScheduleRowInfo(props: { DisplayDate: Date; SPDisplayClass: Class; alt: boolean }) {
    const StudentGrades = useGrades();
    const ClassStartTime = timeToDate(props.SPDisplayClass.startTime, props.DisplayDate);
    const ClassEndTime = timeToDate(props.SPDisplayClass.endTime, props.DisplayDate);
    const isNow = isAfter(props.DisplayDate, ClassStartTime) && isAfter(ClassEndTime, props.DisplayDate);
    const periodforindexing = props.SPDisplayClass.studentVuePeriod === null ? 0 : parseInt(props.SPDisplayClass.studentVuePeriod); // temp please
    return (
        <div className={'TextCenter'}>
            <LinearProgress variant="determinate" value={10} />
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
            <div>
                <strong>
                    {StudentGrades.grades?.terms[5][periodforindexing].string} | {StudentGrades.grades?.terms[5][periodforindexing].raw}
                </strong>
            </div>
            <div>
                <strong>
                    <a href={'mailto:' + 'teacher email'}>Email teacher name</a>
                </strong>
            </div>
            <div>
                <strong>{props.SPDisplayClass.room}</strong>
            </div>

            <div>{isNow ? <div>progress bar{/*<DateBar startDate={startTime} destDate={endTime} /> */}</div> : ''}</div>
        </div>
    );
}
