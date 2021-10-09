import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#48a999',
      main: '#00695c',
      dark: '#004c40',
      contrastText: '#fff',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
