import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { signOut } from 'next-auth/react';

const HeaderLogout = () => {
  return (
    <ActionIcon
      variant='subtle'
      onClick={() => signOut()}
      title={'Sign out'}
      size='lg'
    >
      <IconLogout size={18} />
    </ActionIcon>
  );
};

export default HeaderLogout;
