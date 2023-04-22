import { CssBaseline, PaletteMode, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  primary: {
                      main: '#505050',
                  },
                  secondary: {
                      main: '#dc143c',
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: '#dc143c',
                  },
                  secondary: {
                      main: '#dc143c',
                  },
                  background: {
                      default: '#1a1a1a',
                  },
              }),
    },
    components: {
        // Name of the component ⚛️
        MuiButtonBase: {
            defaultProps: {
                // The props to apply
                disableRipple: false, // No more ripple, on the whole application 💣!
            },
        },
    },
});

export default function ThemeWrapper(props: { children: React.ReactNode }) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = createTheme(getDesignTokens(prefersDarkMode ? 'dark' : 'light'));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    );
}

