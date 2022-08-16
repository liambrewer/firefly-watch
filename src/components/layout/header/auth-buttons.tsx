import { Button, Group } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import Link from 'next/link';

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
} & ButtonProps;

const ButtonLink = ({ children, href, ...buttonProps }: ButtonLinkProps) => {
  return (
    <Link href={href} passHref>
      <Button {...buttonProps} component='a'>
        {children}
      </Button>
    </Link>
  );
};

const HeaderAuthButtons = () => {
  return (
    <Group spacing='xs'>
      <ButtonLink href='/auth/login' variant='subtle'>
        Log in
      </ButtonLink>
      <ButtonLink href='/auth/signup'>Sign up</ButtonLink>
    </Group>
  );
};

export default HeaderAuthButtons;
