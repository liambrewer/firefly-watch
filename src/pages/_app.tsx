import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { emotionCache } from '../utils/emotionCache';
import Layout from '../components/layout';
import { NotificationsProvider } from '@mantine/notifications';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Firefly Watch</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
        emotionCache={emotionCache}
      >
        <NotificationsProvider>
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
