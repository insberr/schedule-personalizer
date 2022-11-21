import { Page } from '../types';
import { store } from '../storage';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export function SettingsButton() {
    const route = store.route.value as Page;

    switch (route) {
        case Page.settings:
            return <SettingsIcon className="spin" color="inherit" />;
        default:
            return <SettingsIcon color="inherit" />;
    }
}

