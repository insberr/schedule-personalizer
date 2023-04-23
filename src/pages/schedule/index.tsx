import ScheduleDisplay from './ScheduleDisplay';
import { VscSettingsGear } from 'react-icons/vsc';
import { Page, currentPage } from '../../storage/page';
import { Button } from '@mui/material';
import React from 'react';

export default function Schedule2() {
    const [count, setCount] = React.useState(0);
    const EventMessages_TEMP = ['test'];
    return (
        <>
            {/* <a
                onClick={() => {
                    currentPage.value = Page.SETTINGS;
                }}
            >
                <VscSettingsGear />
            </a>
            <ScheduleDisplay DisplayEventMessages={EventMessages_TEMP} /> */}
            <Button
                disableRipple={false}
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                {count}
            </Button>
        </>
    );
}
