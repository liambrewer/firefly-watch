import { ActionIcon, Tooltip } from '@mantine/core';

type Props = {
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const DashboardHeaderAction = ({ title, onClick, children }: Props) => {
  return (
    <Tooltip label={title} position='left' withArrow>
      <ActionIcon color='dark' variant='filled' size='xl' onClick={onClick}>
        {children}
      </ActionIcon>
    </Tooltip>
  );
};

export default DashboardHeaderAction;
