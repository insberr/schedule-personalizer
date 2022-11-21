import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SettingsButton } from './SettingsButton';

import { store } from '../storage';
import { Page } from '../types';

// TODO add props to mess with this externally and to make it actually change the page lol lol lol lol oll
export function BottomNav(props: { children?: React.ReactNode }) {
    const [value, setValue] = React.useState('schedule');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    // const noBtns =

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Schedule"
                    value="schedule"
                    icon={<RestoreIcon />}
                    onClick={() => (store.route.value = Page.schedule)}
                />
                <BottomNavigationAction label="Map" value="map" icon={<LocationOnIcon />} onClick={() => (store.route.value = Page.schoolmap)} />
                <BottomNavigationAction label="ID" value="studentid" icon={<FavoriteIcon />} onClick={() => (store.route.value = Page.studentid)} />
                <BottomNavigationAction label="More" value="more" icon={<FavoriteIcon />} onClick={() => (store.route.value = Page.more)} />
                <BottomNavigationAction
                    label="Settings"
                    value="settings"
                    icon={<SettingsButton />}
                    onClick={() => (store.route.value = Page.settings)}
                />
            </BottomNavigation>
        </Paper>
    );
}

