import { Box, AppBar, IconButton, Typography, Toolbar, Button, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PlaceIcon from '@mui/icons-material/Place';
import SettingsIcon from '@mui/icons-material/Settings';

import { Page, currentPage } from '../../storage/page';
import { isStudentVue, studentVueGotSchedules } from '../../storage/studentvue';

export default function SchedulePageHeader() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Schedule v6
                    </Typography>
                    <IconButton
                        size="medium"
                        edge="end"
                        aria-label="map-button"
                        onClick={() => {
                            // currentPage.value = Page.MAP;
                        }}
                    >
                        <PlaceIcon />
                    </IconButton>
                    <IconButton
                        size="medium"
                        edge="end"
                        aria-label="settings-button"
                        onClick={() => {
                            currentPage.value = Page.SETTINGS;
                        }}
                    >
                        <Badge color="secondary" badgeContent={isStudentVue.value && !studentVueGotSchedules.value ? '!' : null}>
                            <SettingsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

