import ScheduleDisplay from './ScheduleDisplay';
import SchedulePageHeader from './SchedulePageHeader';

export default function Schedule() {
    const EventMessages_TEMP = ['test'];
    return (
        <>
            <SchedulePageHeader />
            <ScheduleDisplay DisplayEventMessages={EventMessages_TEMP} />
        </>
    );
}

