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

function InnerButtons() {
    const route = store.route.value as Page;

    switch (route) {
        case Page.schedule:
            return (
                <IconButton size="large" color="inherit" onClick={() => (store.route.value = Page.settings)}>
                    <SettingsIcon color="inherit" />
                </IconButton>
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
