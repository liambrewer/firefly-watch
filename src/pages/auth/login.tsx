import { Button, Center, Paper, Stack, Title } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | Firefly Watch</title>
      </Head>
      <Center sx={{ height: '100%' }}>
        <Paper p='md' withBorder>
          <Stack align='center'>
            <Title>Login</Title>
            <Button
              leftIcon={<IconBrandGoogle />}
              color='red'
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              Continue with Google
            </Button>
          </Stack>
        </Paper>
      </Center>
    </>
  );
};

export default Login;
