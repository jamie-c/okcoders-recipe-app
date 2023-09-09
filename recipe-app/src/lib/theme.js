import { createTheme } from '@mui/material/styles'
import { Inter } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

export const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiCssBaseline: {},
    },
    status: {
        danger: '#e53e3e',
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#010b8b',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#0be7fb',
            contrastText: '#010b8b',
        },
        info: {
            main: '#ff6d69',
        },
        error: {
            main: '#d32f2f',
        },
        text: {
            primary: '#1e0521',
        },
        warning: {
            main: '#fecc50',
        },
    },
})
