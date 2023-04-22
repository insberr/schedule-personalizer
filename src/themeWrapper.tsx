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

