import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { Observation } from '@prisma/client';
import { IconEye } from '@tabler/icons';

import Link from 'next/link';

/*

TEMPORARY ------------------------------------------------------------------

*/

type ListItemProps = {
  observation: Observation;
};

const ListItem = ({ observation }: ListItemProps) => {
  return (
    <Paper p='md'>
      <Stack spacing='xs'>
        <Title>{observation.id}</Title>
        <Text>Latitude: {observation.latitude}</Text>
        <Text>Longitude: {observation.longitude}</Text>
        <Text>Location: {observation.locationId}</Text>
        <Text>Amount 1: {observation.amount1}</Text>
        <Text>Amount 2: {observation.amount2}</Text>
        <Text>Amount 3: {observation.amount3}</Text>
        <Text>Date: {observation.date.toString()}</Text>
        <Text>Time: {observation.time.toString()}</Text>
        <Text>Habitat: {observation.habitat}</Text>
        <Text>Mowed: {observation.mowed}</Text>
        <Text>Temperature: {observation.temperature}</Text>
        <Text>Precipitation: {observation.precipitation}</Text>
        <Text>Wind: {observation.wind}</Text>
        <Text>Cloud Cover: {observation.cloud}</Text>
        <Text>Artificial Light: {observation.light}</Text>
        <Text>Pattern: {observation.pattern}</Text>
        <Text>Pattern Description: {observation.patternDesc}</Text>
        <Text>Notes: {observation.notes}</Text>
        <Group>
          <Link href={`/dashboard/observations/${observation.id}`} passHref>
            <Button leftIcon={<IconEye stroke={1.5} />} component='a'>
              View
            </Button>
          </Link>
        </Group>
      </Stack>
    </Paper>
  );
};

type Props = {
  observations: Observation[];
};

const DashboardObservationsList = ({ observations }: Props) => {
  return (
    <Stack>
      {observations.map((observation) => (
        <ListItem key={observation.id} observation={observation} />
      ))}
    </Stack>
  );
};

export default DashboardObservationsList;
