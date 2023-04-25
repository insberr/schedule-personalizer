import { isAfter } from 'date-fns';
import { Class, timeToDate } from '../../types';
import { LinearProgress } from '@mui/material';
import { studentVueGrades } from '../../storage/studentvue';
import { displayDate } from '../../storage/schedule';

export default function ScheduleRowInfo(props: { SPDisplayClass: Class; alt: boolean }) {
    const StudentGrades = studentVueGrades.value;
    const ClassStartTime = timeToDate(props.SPDisplayClass.startTime, displayDate.value);
    const ClassEndTime = timeToDate(props.SPDisplayClass.endTime, displayDate.value);
    const isNow = isAfter(displayDate.value, ClassStartTime) && isAfter(ClassEndTime, displayDate.value);
    const periodforindexing = props.SPDisplayClass.studentVuePeriod === null ? 0 : parseInt(props.SPDisplayClass.studentVuePeriod); // temp please
    return (
        <div className={'TextCenter'}>
            <LinearProgress variant="determinate" value={10} />
            <div>Duration: 0 minutes</div>
            <div>
                {isAfter(displayDate.value, ClassEndTime) ? (
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
                    {StudentGrades.grades?.terms[5][periodforindexing].string} | {StudentGrades.grades?.terms[5][periodforindexing].raw}%
                </strong>
            </div>
            <div>
                <strong>
                    <a href={'mailto:' + props.SPDisplayClass.teacher.email}>Email {props.SPDisplayClass.teacher.name}</a> In Room{' '}
                    {props.SPDisplayClass.room}
                </strong>
            </div>
        </div>
    );
}

