import { createTheme } from '@mui/material/styles'

export const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#006400',
        },
        secondary: {
            main: '#de5006',
            dark: '#E0A63F',
        },
        background: {
            default: '#E6E3DE',
            paper: '#FFFFFC',
        },
        text: {
            primary: '#341900',
        },
        success: {
            main: '#98CE00',
        },
        warning: {
            main: '#dcb841',
        },
        error: {
            main: '#620803',
        },
        info: {
            main: '#6CCFF6',
        },
    },
    typography: {
        fontFamily: 'Lato',
        h1: {
            fontWeight: 700,
            color: '#006400',
            textTransform: 'uppercase',
            fontSize: '45px',
        },
        h5: {
            fontWeight: 700,
        },
        body: {
            fontFamily: 'Roboto',
        },
    },
    props: {
        MuiAppBar: {
            color: 'transparent',
        },
        MuiButtonBase: {
            disableRipple: true,
        },
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: 'small',
        },
    },
}

export const theme = createTheme(themeOptions)
