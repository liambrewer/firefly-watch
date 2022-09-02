import { Center, Group, Loader, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <Center sx={{ height: '100vh' }}>
        <Group>
          <Loader size='xl' />
          <Title order={3}>Authenticating...</Title>
        </Group>
      </Center>
    );
  }

  if (status === 'unauthenticated') {
    showNotification({
      id: 'auth-guard',
      title: 'You need to be signed in to view this page',
      message: 'Redirecting you to the sign in page',
      color: 'yellow',
    });
    router.replace({
      pathname: '/auth/login',
      query: {
        ...router.query,
        returnUrl: router.asPath,
      },
    });
    return (
      <Center sx={{ height: '100vh' }}>
        <Group>
          <Loader size='xl' color='yellow' />
          <Title order={3}>Redirecting...</Title>
        </Group>
      </Center>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
