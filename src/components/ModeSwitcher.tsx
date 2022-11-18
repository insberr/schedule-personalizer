import IconButton from '@mui/material/IconButton';
import { store } from '../storage';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ModeSwitcher() {
    const theme = store.theme.value;
    return (
        <IconButton
            size="large"
            color="inherit"
            onClick={() => {
                store.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
            }}
        >
            {theme === 'light' ? <DarkModeIcon color="inherit" /> : <LightModeIcon color="inherit" />}
        </IconButton>
    );
}
