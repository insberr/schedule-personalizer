import ScheduleDisplay from './ScheduleDisplay';
import { computedScheduleForDisplay } from '../../storage/schedule';
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
            <Button
                onClick={() => {
                    console.log('test');
                    window.Notification.requestPermission().then((result) => {
                        console.log(result);
                        if (result === 'granted') {
                            navigator.serviceWorker.getRegistration().then((reg) => {
                                reg?.showNotification('Hello world!');
                            });
                        }
                    });
                }}
            >
                <span>Test Notification</span>
            </Button>

            <ScheduleDisplay DisplayEventMessages={EventMessages_TEMP} SPClassesForDisplay={computedScheduleForDisplay.value} />
        </>
    );
}

