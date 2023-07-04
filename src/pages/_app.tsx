// scroll bar
import 'simplebar-react/dist/simplebar.min.css';
// lightbox
/* eslint-disable import/no-unresolved */
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import Head from 'next/head';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ProgressBar from 'src/components/progress-bar';
import { ApolloProvider, apolloClient, clientSideEmotionCache } from 'src/lib/apollo/client';

import { AppProps } from 'next/app';
import { NextPage } from 'next';

import { StoreProvider } from 'easy-peasy';
import { CSnackbar } from 'src/components/provider/CSnackbar';
import { snackbarStore } from 'src/components/provider/snackbarStore';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: any) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width, maximum-scale=1, user-scalable=0"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ProgressBar />
          {getLayout(<Component {...pageProps} />)}
          <StoreProvider store={snackbarStore}>
            <CSnackbar />
          </StoreProvider>
        </LocalizationProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
