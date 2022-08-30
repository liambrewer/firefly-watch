import { Avatar, Divider, Group, Skeleton, Text } from '@mantine/core';
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
        <Group spacing='xs'>
          <Text>Hey, {session.data.user.name}.</Text>
          <Avatar src={session.data.user.image} alt='User Profile Picture' />
        </Group>
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
