import { Navbar as MantineNavbar, NavLink, ThemeIcon } from '@mantine/core';
import { IconHome, IconSettings } from '@tabler/icons';
import Link from 'next/link';

const Navbar = () => {
  return (
    <MantineNavbar width={{ base: 250 }} p='xs'>
      <MantineNavbar.Section grow>
        <Link href='/dashboard' passHref>
          <NavLink
            component='a'
            label='Home'
            icon={
              <ThemeIcon color='blue' variant='light'>
                <IconHome size={16} />
              </ThemeIcon>
            }
          />
        </Link>
        <Link href='/dashboard/settings' passHref>
          <NavLink
            component='a'
            label='Settings'
            icon={
              <ThemeIcon color='orange' variant='light'>
                <IconSettings size={16} />
              </ThemeIcon>
            }
          />
        </Link>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
