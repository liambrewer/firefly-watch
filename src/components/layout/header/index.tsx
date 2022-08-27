import { Box, Group, Header as MantineHeader } from '@mantine/core';
import HeaderLogo from './logo';
import HeaderUserArea from './user-area';

import type { HeaderLink } from './links';
import HeaderLinks from './links';

const HeaderNavLinks: HeaderLink[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Map',
    href: '/map',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    exact: false,
  },
];

const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Group spacing='lg'>
          <HeaderLogo />
          <HeaderLinks links={HeaderNavLinks} />
        </Group>
        <Box sx={{ flexGrow: 1 }} />
        <HeaderUserArea />
      </Box>
    </MantineHeader>
  );
};

export default Header;
