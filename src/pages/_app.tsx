import type { AppContext, AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import type { ColorScheme } from '@mantine/core';
import { emotionCache } from '../utils/emotionCache';
import Layout from '../components/layout';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import App from 'next/app';
import { useState } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { NextComponentType, NextPageContext } from 'next';
import AuthGuard from '../components/auth-guard';
import { RouterTransition } from '../components/router-transition';

type Props = {
  Component: NextComponentType<NextPageContext, any, {}> & {
    requireAuth?: boolean;
  };
  colorScheme: ColorScheme;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...props
}: AppProps & Props) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme);
  };

  return (
    <>
      <Head>
        <title>Firefly Watch</title>
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
          emotionCache={emotionCache}
        >
          <NotificationsProvider>
            <ModalsProvider>
              <SessionProvider session={session}>
                <RouterTransition />
                {Component.requireAuth ? (
                  <AuthGuard>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AuthGuard>
                ) : (
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                )}
              </SessionProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const pageProps = await App.getInitialProps(appContext);

  return {
    ...pageProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'light',
  };
};
