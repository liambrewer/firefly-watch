import { Alert, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Error: NextPage = () => {
  const {
    query: { error },
  } = useRouter();

  return (
    <Alert
      icon={<IconAlertCircle size={48} />}
      title='Error Authenticating.'
      color='red'
    >
      {error}
    </Alert>
  );
};

export default Error;
