import { Box, Header as MantineHeader } from '@mantine/core';
import HeaderLogo from './logo';
import HeaderUserArea from './user-area';

const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <HeaderLogo />
        <Box sx={{ flexGrow: 1 }} />
        <HeaderUserArea />
      </Box>
    </MantineHeader>
  );
};

export default Header;
