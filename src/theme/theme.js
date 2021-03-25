import typographyVariants from './typographyVariants';

export const colors = {
  background: {
    main: '#F5F5F5',
    dark: '#22263F',
  },
  borders: {
    main: {
      color: '#F1F1F1',
    },
  },
  primary: {
    main: {
      color: '#F5F5F5',
      contrastText: '#181B33',
    },
  },
  secondary: {
    main: {
      color: '#181B33',
      contrastText: '#F5F5F5',
    },
    light: {
      color: '#295984',
      contrastText: '#F5F5F5',
    },
  },
  quaternary: {
    main: {
      color: '#9FB6D0',
      contrastText: '#22263F',
    },
    dark: {
      color: '#22263F',
      contrastText: '#9FB6D0',
    },
  },
  tertiary: {
    main: {
      color: '#F2F2F2',
      contrastText: '#fff',
    },
    light: {
      color: '#88989E',
      contrastText: '#fff',
    },
    dark: {
      color: '#888888',
      contrastText: '#fff',
    },
    svg: {
      color: '#070C0E',
    },
  },
};

export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
};

export default {
  colors,
  typographyVariants,
  breakpoints,
  borderRadius: '16px',
  transition: '200ms ease-in-out',
  fontFamily: '\'Alegreya Sans\', sans-serif',
};
