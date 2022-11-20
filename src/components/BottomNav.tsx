import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// TODO add props to mess with this externally and to make it actually change the page lol lol lol lol oll
export function BottomNav() {
    const [value, setValue] = React.useState('schedule');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction label="Schedule" value="schedule" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Map" value="map" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="ID" value="studentid" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Settings" value="settings" icon={<FolderIcon />} />
            </BottomNavigation>
        </Paper>
    );
}

