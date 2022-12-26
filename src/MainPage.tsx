import { BottomNav } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { Route } from './lib/router/Route';
import { RouterBlock } from './lib/router/RouterBlock';
import { SchedulePage } from './pages/schedule';
import { store } from './storage';

import { SettingsPage } from './pages/settings';
import { Page, Tab } from './types';

// Icons
import { SettingsButton } from './components/SettingsButton';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import ListIcon from '@mui/icons-material/List'; // maybe try this one later
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import EggOutlinedIcon from '@mui/icons-material/EggOutlined';
// import BadgeIcon from '@mui/icons-material/Badge';

const bottomNavTabsList: Tab[] = [
    { label: 'Schedule', value: 'schedule', icon: <ScheduleIcon />, onClick: () => (store.route.value = Page.schedule) },
    { label: 'Map', value: 'map', icon: <MapOutlinedIcon />, onClick: () => (store.route.value = Page.schoolmap) },
    { label: 'ID', value: 'id', icon: <BadgeOutlinedIcon />, onClick: () => (store.route.value = Page.studentid) },
    { label: 'More', value: 'more', icon: <MoreHorizIcon />, onClick: () => (store.route.value = Page.more) },
    { label: 'Settings', value: 'settings', icon: <SettingsButton />, onClick: () => (store.route.value = Page.settings) },
];

export function MainPage() {
    return (
        <>
            <TopBar />
            <RouterBlock>
                <Route routes={[Page.schedule]} unmount={false}>
                    <SchedulePage />
                </Route>
                <Route routes={[Page.settings]}>
                    <SettingsPage />
                </Route>
                <Route routes={[Page.nopage]}>
                    <div>No page for this tab yet</div>
                </Route>
            </RouterBlock>
            <BottomNav tabs={bottomNavTabsList} showLabels={false} />
        </>
    );
}

