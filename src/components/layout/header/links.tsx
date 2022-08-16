import { Button, Group } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type HeaderLink = {
  title: string;
  href: string;
} & ButtonProps;

type Props = {
  links: HeaderLink[];
};

const HeaderLinks = ({ links }: Props) => {
  const router = useRouter();

  return (
    <Group spacing='xs'>
      {links.map(({ title, href, ...buttonProps }) => {
        const active = router.pathname === href;

        return (
          <Link href={href} key={title} passHref>
            <Button
              component='a'
              color='dark'
              variant={active ? 'filled' : 'subtle'}
              {...buttonProps}
            >
              {title}
            </Button>
          </Link>
        );
      })}
    </Group>
  );
};

export default HeaderLinks;
