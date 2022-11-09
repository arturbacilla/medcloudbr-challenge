import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#F8F8F8',
      main: '#0698dc',
      dark: '#F1F1F1',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            backgroundColor: '#00008f',
          },
        },
      },
    },
  },
});

export default themeOptions;
