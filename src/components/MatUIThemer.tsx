import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '../storage';
import { useEffect } from 'react';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#dc143c',
        },
        secondary: {
            main: '#dc5014',
        },
        background: {
            default: '#272727',
            paper: '#1b1b1b',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: '#121212',
            },
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#dc143c',
        },
        secondary: {
            main: '#dcb414',
        },
    },
});

const themeLookup = {
    dark: darkTheme,
    light: lightTheme,
};

type props = {
    children: any;
};

export function MatUIThemer(p: props) {
    const theme = store.theme.value as 'dark' | 'light';
    useEffect(() => {
        document.body.classList.remove('lightStart', 'darkStart');
    }, []);

    return (
        <ThemeProvider theme={themeLookup[theme]}>
            <CssBaseline />
            {p.children}
        </ThemeProvider>
    );
}
