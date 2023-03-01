import { Text } from '@mantine/core';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
};

const FooterGridStackLink = ({ title, href }: Props) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Text>{title}</Text>
    </Link>
  );
};

export default FooterGridStackLink;
