import {
  DefaultMantineColor,
  Navbar,
  NavLink,
  NavLinkProps,
  ThemeIcon,
} from '@mantine/core';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export type NavbarLink = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  color?: DefaultMantineColor;
  exact?: boolean;
  links?: NavbarLink[];
} & NavLinkProps;

type Props = {
  links: NavbarLink[];
};

const Link = ({
  title,
  href,
  icon,
  color = 'blue',
  exact = true,
  links,
  ...navLinkProps
}: NavbarLink) => {
  const router = useRouter();

  const active = exact
    ? router.pathname === href
    : router.pathname.startsWith(href);

  return (
    <NextLink
      href={href}
      key={title}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <NavLink
        active={active}
        color={color}
        label={title}
        icon={
          icon && (
            <ThemeIcon variant={active ? 'filled' : 'light'} color={color}>
              {icon}
            </ThemeIcon>
          )
        }
        {...navLinkProps}
      >
        {links && links.map((link) => <Link key={link.href} {...link} />)}
      </NavLink>
    </NextLink>
  );
};

const NavbarLinks = ({ links }: Props) => {
  return (
    <Navbar.Section grow>
      {links.map((link) => (
        <Link key={link.href} {...link} />
      ))}
    </Navbar.Section>
  );
};

export default NavbarLinks;
