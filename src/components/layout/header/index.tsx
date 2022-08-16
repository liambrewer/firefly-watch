import { Box, Group, Header as MantineHeader, Title } from '@mantine/core';
import HeaderAuthButtons from './auth-buttons';
import HeaderLogo from './logo';
import HeaderThemeToggle from './theme-toggle';

const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <HeaderLogo />
        <Box sx={{ flexGrow: 1 }} />
        <Group>
          <HeaderAuthButtons />
          <HeaderThemeToggle />
        </Group>
      </Box>
    </MantineHeader>
  );
};

export default Header;
