import { useMemo, useState } from 'react';
import { Class, Term } from '../../types';
import ScheduleDisplay from './ScheduleDisplay';
import { displayDate, computedScheduleForDisplay } from '../../storage/schedule';
import { ScheduleEvent } from '../../config/events';
import { schedules } from '../../config/schedules';
import { VscSettingsGear } from 'react-icons/vsc';
import { Page, currentPage } from '../../storage/page';
import { Button } from '@mui/material';

export default function Schedule2() {
    const EventMessages_TEMP = useMemo(() => {
        return displayDate.value.getDay() === 6 || displayDate.value.getDay() === 0 ? ['Its The Weekend'] : [];
    }, []);
    return (
        <>
            <a
                onClick={() => {
                    currentPage.value = Page.SETTINGS;
                }}
            >
                <VscSettingsGear className={'white-icon'} />
            </a>
            <ScheduleDisplay DisplayEventMessages={EventMessages_TEMP} SPClassesForDisplay={computedScheduleForDisplay.value} />
            <Button
                onClick={() => {
                    window.Notification.requestPermission().then((result) => {
                        console.log(result);
                        if (result === 'granted') {
                            navigator.serviceWorker.getRegistration().then((reg) => {
                                alert(reg);
                                reg?.showNotification('Hello world!');
                            });
                        }
                    });
                }}
            >
                test notif
            </Button>
        </>
    );
}

