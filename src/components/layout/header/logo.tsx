import { Box, Title } from '@mantine/core';
import Link from 'next/link';

const HeaderLogo = () => {
  return (
    <Link href='/' passHref>
      <Box
        component='a'
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        <Title>Firefly Watch</Title>
      </Box>
    </Link>
  );
};

export default HeaderLogo;
