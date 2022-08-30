import { Paper, Stack, Text, Title } from '@mantine/core';
import type { Location } from '@prisma/client';

type Props = {
  locations: Location[];
};

const ListItem = ({ location }: { location: Location }) => {
  return (
    <Paper>
      <Stack>
        <Title>{location.name}</Title>
        <Text>Latitude: {location.latitude}</Text>
        <Text>Longitude: {location.longitude}</Text>
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
