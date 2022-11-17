import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '../storage';
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
    children: any;
};

export function MatUIThemer(p: props) {
    const theme = store.theme.value;
    return (
        <ThemeProvider theme={themeLookup[theme]}>
            <CssBaseline />
            {p.children}
        </ThemeProvider>
    );
}
