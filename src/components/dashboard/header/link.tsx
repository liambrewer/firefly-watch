import { ActionIcon, Tooltip } from '@mantine/core';
import Link from 'next/link';

type Props = {
  title: string;
  href: string;
  children?: React.ReactNode;
};

const DashboardHeaderLink = ({ title, href, children }: Props) => {
  return (
    <Tooltip label={title} position='left' withArrow>
      <Link href={href} passHref legacyBehavior>
        <ActionIcon component='a' color='dark' variant='filled' size='xl'>
          {children}
        </ActionIcon>
      </Link>
    </Tooltip>
  );
};

export default DashboardHeaderLink;
