import {
  Box,
  Divider,
  Group,
  Header as MantineHeader,
  Text,
} from '@mantine/core';
import { useSession } from 'next-auth/react';
import HeaderAuthButtons from './auth-buttons';
import HeaderLogo from './logo';
import HeaderLogout from './logout';
import HeaderThemeToggle from './theme-toggle';

const Header = () => {
  const session = useSession();

  return (
    <MantineHeader height={60} p='xs'>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <HeaderLogo />
        <Box sx={{ flexGrow: 1 }} />
        <Group>
          {session?.data?.user ? (
            <Text>Hey, {session.data.user.name}.</Text>
          ) : (
            <HeaderAuthButtons />
          )}
          {/* <HeaderAuthButtons /> */}
          <Divider orientation='vertical' />
          <Group spacing='xs'>
            <HeaderThemeToggle />
            {session?.data?.user && <HeaderLogout />}
          </Group>
        </Group>
      </Box>
    </MantineHeader>
  );
};

export default Header;
