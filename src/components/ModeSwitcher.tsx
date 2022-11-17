import Button from '@mui/material/Button';
import { store } from '../storage';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ModeSwitcher() {
    const theme = store.theme.value;
    return (
        <Button
            onClick={() => {
                store.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
            }}
        >
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
    );
}
