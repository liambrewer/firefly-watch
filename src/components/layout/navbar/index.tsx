import { Navbar as MantineNavbar } from '@mantine/core';
import {
  IconCurrentLocation,
  IconEye,
  IconHome,
  IconSettings,
} from '@tabler/icons-react';
import NavbarLinks, { NavbarLink } from './links';

const NavLinks: NavbarLink[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: <IconHome size={16} />,
  },
  {
    title: 'Observations',
    href: '/dashboard/observations',
    icon: <IconEye size={16} />,
    color: 'violet',
    exact: false,
  },
  {
    title: 'Locations',
    href: '/dashboard/locations',
    icon: <IconCurrentLocation size={16} />,
    color: 'teal',
    exact: false,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <IconSettings size={16} />,
    color: 'orange',
  },
];

const Navbar = () => {
  return (
    <MantineNavbar width={{ base: 250 }} p='xs'>
      <NavbarLinks links={NavLinks} />
    </MantineNavbar>
  );
};

export default Navbar;
