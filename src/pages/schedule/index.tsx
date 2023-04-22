import ScheduleDisplay from './ScheduleDisplay';
import { VscSettingsGear } from 'react-icons/vsc';
import { Page, currentPage } from '../../storage/page';
import { Button } from '@mui/material';

export default function Schedule2() {
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

