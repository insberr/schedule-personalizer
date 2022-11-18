import { AppBar, IconButton, Popover, Toolbar, Typography } from '@mui/material';
import { Page } from '../types';
import { store } from '../storage';
import { ModeSwitcher } from './ModeSwitcher';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

import { isSameDay } from 'date-fns';
import { today } from '../lib/today';
import { addDays } from 'date-fns';
import { Calendar } from './Calendar';
import { useRef, useState } from 'react';

function CalPopupButton() {
    const [CalOpen, setCalOpen] = useState(false);
    const calRef = useRef(null);
    return (
        <>
            <IconButton size="large" color="inherit" ref={calRef} onClick={() => setCalOpen(!CalOpen)}>
                <CalendarMonthIcon color="inherit" />
            </IconButton>
            <Popover
                open={CalOpen}
                anchorEl={calRef.current}
                onClose={() => setCalOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Calendar />
            </Popover>
        </>
    );
}

function InnerButtons() {
    const route = store.route.value as Page;
    const displayDate = store.displayDate.value as Date;
    const moveDays = (days: number) => {
        store.displayDate.value = addDays(store.displayDate.value, days);
    };
    switch (route) {
        case Page.schedule:
            return (
                <>
                    {!isSameDay(displayDate, today()) ? (
                        <IconButton size="large" color="inherit" onClick={() => (store.displayDate.value = today())}>
                            <HomeIcon color="inherit" />
                        </IconButton>
                    ) : (
                        <></>
                    )}
                    <IconButton size="large" color="inherit" onClick={() => moveDays(-1)}>
                        <ArrowBackIcon color="inherit" />
                    </IconButton>
                    <CalPopupButton />
                    <IconButton size="large" color="inherit" onClick={() => moveDays(1)}>
                        <ArrowForwardIcon color="inherit" />
                    </IconButton>
                    <ModeSwitcher />
                    <IconButton size="large" color="inherit" onClick={() => (store.route.value = Page.settings)}>
                        <SettingsIcon color="inherit" />
                    </IconButton>
                </>
            );
        case Page.settings:
            return (
                <>
                    <ModeSwitcher />
                    <IconButton size="large" color="inherit" onClick={() => (store.route.value = Page.schedule)}>
                        <SettingsIcon className="spin" color="inherit" />
                    </IconButton>
                </>
            );
        default:
            return <></>;
    }
}

export function TopBar() {
    // we can conditionally render buttons by checking the current route, then setting values accordingly,
    // or we could just not render on some pages.
    // we should only really have to modify displayDate

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Schedule Personalizer
                </Typography>
                <InnerButtons />
            </Toolbar>
        </AppBar>
    );
}
