import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
  const BasicMapWithNoSSR = dynamic(
    () => import('../components/maps/basic-map'),
    {
      ssr: false,
    }
  );

  return <BasicMapWithNoSSR />;
};

export default Home;
