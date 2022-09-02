import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { Location } from '@prisma/client';
import { IconArrowRight } from '@tabler/icons';
import Link from 'next/link';

type ListItemProps = {
  location: Location;
};

const ListItem = ({ location }: ListItemProps) => {
  return (
    <Paper p='xs'>
      <Group position='apart'>
        <Title order={3}>{location.name}</Title>
        <Link href={`/dashboard/observations/new/${location.id}`} passHref>
          <Button rightIcon={<IconArrowRight />} component='a'>
            New Observation
          </Button>
        </Link>
      </Group>
    </Paper>
  );
};

type Props = {
  locations: Location[];
};

const DashboardObservationsSelectList = ({ locations }: Props) => {
  return (
    <Stack>
      {locations.map((location) => (
        <ListItem key={location.id} location={location} />
      ))}
    </Stack>
  );
};

export default DashboardObservationsSelectList;
