import { Box, Header as MantineHeader, Title } from '@mantine/core';

const Header = () => {
  return (
    <MantineHeader height={60} p='xs'>
      <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Title>Firefly Watch</Title>
      </Box>
    </MantineHeader>
  );
};

export default Header;
