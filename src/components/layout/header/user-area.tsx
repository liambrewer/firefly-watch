import {
  Avatar,
  Divider,
  Group,
  Menu,
  Skeleton,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { NextLink } from '@mantine/next';
import {
  IconCurrentLocation,
  IconEye,
  IconHome,
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconSun,
  IconX,
} from '@tabler/icons';
import { signOut, useSession } from 'next-auth/react';
import HeaderAuthButtons from './auth-buttons';

const HeaderUserArea = () => {
  const session = useSession();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  if (session.status === 'loading') {
    return <Skeleton width={200} height={40} />;
  }

  const openLogoutModal = () =>
    openConfirmModal({
      title: 'Are you sure you want to logout?',
      centered: true,
      children: (
        <Text size='sm'>
          If you log out you will not be able to view the dashboard until you
          log back in.
        </Text>
      ),
      labels: {
        confirm: 'Logout',
        cancel: 'Stay signed in',
      },
      cancelProps: {
        leftIcon: <IconX size={16} />,
      },
      confirmProps: {
        color: 'red',
        leftIcon: <IconLogout size={16} />,
      },
      onConfirm: () => {
        signOut({
          callbackUrl: '/auth/login',
        });
      },
    });

  return session.status === 'authenticated' ? (
    <Menu width={200} position='bottom-end' offset={15} withinPortal>
      <Menu.Target>
        <UnstyledButton>
          <Avatar
            src={session.data.user.image}
            alt='User Profile Picture'
            radius='xl'
          >
            {session.data.user.name
              ?.split(' ')
              .map((word) => word[0])
              .join('')}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Hey, {session.data.user.name}.</Menu.Label>
        <Menu.Divider />
        <Menu.Label>Dashboard</Menu.Label>
        <Menu.Item
          component={NextLink}
          href='/dashboard/observations'
          color='blue'
          icon={<IconHome size={14} />}
        >
          Home
        </Menu.Item>
        <Menu.Item
          component={NextLink}
          href='/dashboard/observations'
          color='violet'
          icon={<IconEye size={14} />}
        >
          Observations
        </Menu.Item>
        <Menu.Item
          component={NextLink}
          href='/dashboard/locations'
          color='teal'
          icon={<IconCurrentLocation size={14} />}
        >
          Locations
        </Menu.Item>
        <Menu.Item
          component={NextLink}
          href='/dashboard/settings'
          color='orange'
          icon={<IconSettings size={14} />}
        >
          Settings
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => toggleColorScheme()}
          icon={dark ? <IconSun size={14} /> : <IconMoonStars size={14} />}
        >
          {dark ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
        </Menu.Item>
        <Menu.Item
          onClick={openLogoutModal}
          color='red'
          icon={<IconLogout size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <HeaderAuthButtons />
  );
};

export default HeaderUserArea;
