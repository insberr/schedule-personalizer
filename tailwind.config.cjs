const daisyui = require('daisyui');

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],

    theme: {
        extend: {},
    },

    plugins: [daisyui],
    daisyui: {
        themes: ['dark', 'light'],
        themes: [
            {
                dark: {
                    primary: '#DC143C',

                    secondary: '#D926AA',

                    accent: '#1FB2A5',

                    neutral: '#191D24',

                    'base-100': '#2A303C',

                    info: '#3ABFF8',

                    success: '#36D399',

                    warning: '#FBBD23',

                    error: '#F87272',
                },
            },
        ],

        darkTheme: 'dark', // sets the dark theme for dark mode users
    },
};

module.exports = config;
