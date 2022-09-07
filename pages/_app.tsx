import * as React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import axios from 'axios';
import createEmotionCache from 'src/createEmotionCache';
import ThemeProvider from 'src/theme';
import WebsiteGlobalProvider from 'src/components/wrappers/WebsiteGlobalProvider';
import ProgressLinear from 'src/components/commons/ProgressLinear';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  axios.defaults.baseURL = process.env.NEXTAUTH_URL;
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider>
          <ProgressLinear />
          <WebsiteGlobalProvider>
            <Component {...pageProps} />
          </WebsiteGlobalProvider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
