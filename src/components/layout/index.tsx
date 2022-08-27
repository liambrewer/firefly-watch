import { AppShell } from '@mantine/core';
import Header from './header';
import Footer from './footer';
import { useRouter } from 'next/router';
import Navbar from './navbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  return (
    <AppShell
      padding='md'
      footer={<Footer />}
      header={<Header />}
      navbar={router.pathname.startsWith('/dashboard') ? <Navbar /> : <></>}
      sx={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
