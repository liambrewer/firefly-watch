import { Alert, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Error: NextPage = () => {
  const {
    query: { error },
  } = useRouter();

  return (
    <>
      <Head>
        <title>Auth Error | Firefly Watch</title>
      </Head>
      <Alert
        icon={<IconAlertCircle size={48} />}
        title='Error Authenticating.'
        color='red'
      >
        {error}
      </Alert>
    </>
  );
};

export default Error;
