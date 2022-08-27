import { Title } from '@mantine/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Location: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  return <Title>Location #{id}</Title>;
};

export default Location;
