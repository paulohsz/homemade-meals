/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme/theme';

export default function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <MaterialThemeProvider theme={theme}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </MaterialThemeProvider>
      </ThemeProvider>
    </>
  );
}
