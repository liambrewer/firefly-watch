import { Paper, Stack, Title } from '@mantine/core';
import type { Location } from '@prisma/client';

type Props = {
  locations: Location[];
};

const ListItem = ({ location }: { location: Location }) => {
  return (
    <Paper>
      <Stack>
        <Title>{location.name}</Title>
      </Stack>
    </Paper>
  );
};

const DashboardLocationsList = ({ locations }: Props) => {
  return (
    <Stack>
      {locations.map((location) => (
        <ListItem key={location.id} location={location} />
      ))}
    </Stack>
  );
};

export default DashboardLocationsList;
