import { Box, Divider, Group, Stack, Title } from '@mantine/core';

type Props = {
  title: string;
  action?: React.ReactNode;
};

const DashboardHeader = ({ title, action }: Props) => {
  return (
    <Stack spacing='xs'>
      <Group position='apart'>
        <Title>{title}</Title>
        {action}
      </Group>
      <Divider />
    </Stack>
  );
};

export default DashboardHeader;
