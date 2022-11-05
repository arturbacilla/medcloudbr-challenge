import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#F8F8F8',
      main: '#8CA6D7',
      dark: '#F1F1F1',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default themeOptions;
