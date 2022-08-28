import { Divider, Group, Loader, Stack, Title } from '@mantine/core';
import type { DefaultMantineColor } from '@mantine/core';

type Props = {
  title: string;
  color?: DefaultMantineColor;
  loading?: boolean;
  action?: React.ReactNode;
};

const DashboardHeader = ({ title, color = 'blue', loading, action }: Props) => {
  return (
    <Stack spacing='xs'>
      <Group position='apart'>
        <Group spacing='xs'>
          <Title>{title}</Title>
          {loading && <Loader color={color} />}
        </Group>
        {action}
      </Group>
      <Divider />
    </Stack>
  );
};

export default DashboardHeader;
