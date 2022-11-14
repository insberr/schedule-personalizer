import { useTheme } from '../storage/lightanddark';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const themeLookup = {
    dark: darkTheme,
    light: lightTheme,
};

type props = {
    children: JSX.Element | JSX.Element[];
};

export function MatUIThemer(p: props) {
    const theme = useTheme();
    return (
        <ThemeProvider theme={themeLookup[theme]}>
            <CssBaseline />
            {p.children}
        </ThemeProvider>
    );
}
