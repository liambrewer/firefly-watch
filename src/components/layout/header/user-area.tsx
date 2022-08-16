import { Divider, Group, Skeleton, Text } from '@mantine/core';
import { useSession } from 'next-auth/react';
import HeaderAuthButtons from './auth-buttons';
import HeaderLogout from './logout';
import HeaderThemeToggle from './theme-toggle';

const HeaderUserArea = () => {
  const session = useSession();

  if (session.status === 'loading') {
    return <Skeleton width={200} height={40} />;
  }

  return (
    <Group>
      {session?.data?.user ? (
        <Text>Hey, {session.data.user.name}.</Text>
      ) : (
        <HeaderAuthButtons />
      )}
      <Divider orientation='vertical' />
      <Group spacing='xs'>
        <HeaderThemeToggle />
        {session?.data?.user && <HeaderLogout />}
      </Group>
    </Group>
  );
};

export default HeaderUserArea;
