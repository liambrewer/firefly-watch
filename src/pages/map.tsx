import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const BasicMapWithNoSSR = dynamic(
  () => import('../components/maps/basic-map'),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  return <BasicMapWithNoSSR />;
};

export default Home;
