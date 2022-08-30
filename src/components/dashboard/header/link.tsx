import { ActionIcon, Tooltip } from '@mantine/core';
import { NextLink } from '@mantine/next';

type Props = {
  title: string;
  href: string;
  children?: React.ReactNode;
};

const DashboardHeaderLink = ({ title, href, children }: Props) => {
  return (
    <Tooltip label={title} position='left' withArrow>
      <ActionIcon
        component={NextLink}
        href={href}
        color='dark'
        variant='filled'
        size='xl'
      >
        {children}
      </ActionIcon>
    </Tooltip>
  );
};

export default DashboardHeaderLink;
