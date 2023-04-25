import ScheduleDisplay from './ScheduleDisplay';
import { VscSettingsGear } from 'react-icons/vsc';
import { Page, currentPage } from '../../storage/page';

export default function Schedule() {
    const EventMessages_TEMP = ['test'];
    return (
        <>
            <a
                onClick={() => {
                    currentPage.value = Page.SETTINGS;
                }}
            >
                <VscSettingsGear />
            </a>
            <ScheduleDisplay DisplayEventMessages={EventMessages_TEMP} />
        </>
    );
}

