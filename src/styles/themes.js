import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { createTheme } from '@material-ui/core/styles';

export const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#9eba32',
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
      fontFamily: 'Noto Sans',
      h1: {
        fontFamily: 'Roboto Slab',
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
  };

  export const theme = createTheme(themeOptions);