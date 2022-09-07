// @mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

//
import palette from './palette';
// import typography from './typography';
// import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import { Props } from 'src/types/commons';
// import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------


const themeOptions: ThemeOptions = {
  palette: palette,
  shape: { borderRadius: 8 },
};

const ThemeProvider = ({ children }: Props) => {

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );

};

export default ThemeProvider;
