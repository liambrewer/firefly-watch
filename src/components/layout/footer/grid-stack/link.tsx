import { Text } from '@mantine/core';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
};

const FooterGridStackLink = ({ title, href }: Props) => {
  return (
    <Link href={href} passHref>
      <Text component='a'>{title}</Text>
    </Link>
  );
};

export default FooterGridStackLink;
