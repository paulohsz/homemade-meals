/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import axios from 'axios';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import WebsiteGlobalProvider from '../src/components/wrappers/WebsitePage/provider';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  axios.defaults.baseURL = process.env.NEXTAUTH_URL;

  return (
    <Provider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <WebsiteGlobalProvider>
            <Component {...pageProps} />
          </WebsiteGlobalProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
