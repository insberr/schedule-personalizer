import { AppBar, IconButton, Popover, Toolbar, Typography } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';

import MenuIcon from '@mui/icons-material/Menu';

import { isSameDay } from 'date-fns';
import { today } from '../lib/today';
import { addDays } from 'date-fns';
import { Calendar } from './Calendar';
import { useRef, useState } from 'react';
import { SettingsButton } from './SettingsButton';

export function TopBar(props: { children?: React.ReactNode }) {
    // we can conditionally render buttons by checking the current route, then setting values accordingly,
    // or we could just not render on some pages.
    // we should only really have to modify displayDate

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Schedule Personalizer
                </Typography>
                {props.children}
            </Toolbar>
        </AppBar>
    );
}

