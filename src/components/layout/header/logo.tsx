import { Box, Title } from '@mantine/core';
import Link from 'next/link';

const HeaderLogo = () => {
  return (
    <Link
      href='/'
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Title>Firefly Watch</Title>
    </Link>
  );
};

export default HeaderLogo;
