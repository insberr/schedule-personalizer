import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SettingsButton } from './SettingsButton';

import { store } from '../storage';
import { Page, Tab } from '../types';

// TODO add props to mess with this externally and to make it actually change the page lol lol lol lol oll
export function BottomNav(props: {
    showLabels?: boolean;
    tabs: Tab[];
    handleTabChange: (event: React.SyntheticEvent, newValue: string, lastValue: string, setValue: (v: string) => void) => void;
}) {
    const [value, setValue] = React.useState('schedule');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        const lastValue = value;
        setValue(newValue);
        props.handleTabChange(event, newValue, lastValue, setValue);
    };

    // const noBtns =

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange} showLabels={props?.showLabels || false}>
                {props.tabs.map((tab, i) => {
                    return <BottomNavigationAction key={'tab-' + i} label={tab.label} value={tab.value} icon={tab.icon} onClick={tab.onClick} />;
                })}
            </BottomNavigation>
        </Paper>
    );
}

