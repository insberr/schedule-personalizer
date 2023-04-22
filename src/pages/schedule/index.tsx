import ScheduleDisplay from './ScheduleDisplay';
import { computedScheduleForDisplay } from '../../storage/schedule';
import { VscSettingsGear } from 'react-icons/vsc';
import { Page, currentPage } from '../../storage/page';
import { ButtonBase as MButton } from '@mui/material';
import { Checkbox } from '@mui/material';
export default function Schedule2() {
    const EventMessages_TEMP = ['test'];
    return (
        <>
            <a
                onClick={() => {
                    currentPage.value = Page.SETTINGS;
                }}
            >
                <VscSettingsGear className={'white-icon'} />
            </a>
            <MButton>test notif</MButton>
            <Checkbox />
            <ScheduleDisplay DisplayEventMessages={EventMessages_TEMP} SPClassesForDisplay={computedScheduleForDisplay.value} />
        </>
    );
}

