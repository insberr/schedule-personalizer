import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { Route } from './lib/router/Route';
import { RouterBlock } from './lib/router/RouterBlock';
import { SchedulePage } from './pages/schedule';
import { store } from './storage';

import { SettingsPage } from './pages/settings';
import { Page, Tab } from './types';

import { SettingsButton } from './components/SettingsButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ScheduleIcon from '@mui/icons-material/Schedule';
// import ListIcon from '@mui/icons-material/List'; // maybe try this one later

import LocationOnIcon from '@mui/icons-material/LocationOn';

import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
// import BadgeIcon from '@mui/icons-material/Badge';

import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import EggOutlinedIcon from '@mui/icons-material/EggOutlined';

export function MainPage() {
    const settingsTabs: Tab[] = [
        { label: 'Exit', value: 'settings-exit-schedule', icon: <ArrowBackIcon />, onClick: () => (store.route.value = Page.schedule) },
        { label: 'Developer', value: 'settings-developer', icon: <EggOutlinedIcon />, onClick: () => (store.route.value = Page.developer) },
        { label: 'Settings', value: 'settings-schedule', icon: <SettingsButton />, onClick: () => (store.route.value = Page.schedule) },
    ];

    const defaultTabs: Tab[] = [
        { label: 'Schedule', value: 'schedule', icon: <ScheduleIcon />, onClick: () => (store.route.value = Page.schedule) },
        { label: 'Map', value: 'map', icon: <MapOutlinedIcon />, onClick: () => (store.route.value = Page.schoolmap) },
        { label: 'ID', value: 'id', icon: <BadgeOutlinedIcon />, onClick: () => (store.route.value = Page.studentid) },
        { label: 'More', value: 'more', icon: <MoreHorizIcon />, onClick: () => (store.route.value = Page.more) },
        { label: 'Settings', value: 'settings', icon: <SettingsButton />, onClick: () => (store.route.value = Page.settings) },
    ];

    const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
    const [showLabels, setShowLabels] = useState<boolean>(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string, lastValue: string, setValue: (v: string) => void) => {
        if (!lastValue.includes('settings') && newValue.includes('settings')) {
            setShowLabels(true);
            setValue('settings-schedule');
            return setTabs(settingsTabs);
        }

        if (lastValue.includes('settings') && newValue.includes('schedule')) {
            setShowLabels(false);
            setValue('schedule');
            return setTabs(defaultTabs);
        }
    };

    return (
        <>
            <TopBar />
            <RouterBlock>
                <Route routes={[Page.schedule]} unmount={false}>
                    <SchedulePage />
                </Route>
                <Route routes={[Page.settings]}>
                    <SettingsPage defaultTabs={defaultTabs} setTabs={setTabs} />
                </Route>
                <Route routes={[Page.nopage]}>
                    <div>No page for this tab yet</div>
                </Route>
            </RouterBlock>
            <BottomNav tabs={tabs} handleTabChange={handleTabChange} showLabels={showLabels} />
        </>
    );
}

