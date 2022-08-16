import { Button, Title } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';

const Login: NextPage = () => {
  return (
    <>
      <Title>Login</Title>
      <Button
        leftIcon={<IconBrandGoogle />}
        color='red'
        onClick={() => signIn('google')}
      >
        Continue with Google
      </Button>
    </>
  );
};

export default Login;
