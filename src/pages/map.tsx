import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const BasicMapWithNoSSR = dynamic(
  () => import('../components/maps/basic-map'),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Map | Firefly Watch</title>
      </Head>
      <BasicMapWithNoSSR />
    </>
  );
};

export default Home;
