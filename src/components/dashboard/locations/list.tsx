import {
  Button,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import type { Location } from '@prisma/client';
import { IconLiveView, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import type { AxiosError } from 'axios';
import ModalDeleteLocation from '../../modals/delete-location';
import Link from 'next/link';
import useLocations from '../../../hooks/use-locations';

type Props = {
  locations: Location[];
};

const ListItem = ({ location }: { location: Location }) => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

  const { data: locations, mutate } = useLocations();

  const handleDelete = async () => {
    showNotification({
      id: `delete-location-${location.id}`,
      title: `Deleting Location: ${location.name}`,
      message: 'Please wait...',
      loading: true,
      autoClose: false,
      disallowClose: true,
    });

    try {
      await axios.delete(`/api/locations/${location.id}`);
      mutate(locations?.filter((l) => l.id !== location.id));
      updateNotification({
        id: `delete-location-${location.id}`,
        title: `Deleted Location: ${location.name}`,
        message: 'Location deleted successfully',
        color: 'green',
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        updateNotification({
          id: `delete-location-${location.id}`,
          title: `Error Deleting Location: ${location.name}`,
          message: error.response?.statusText,
          color: 'red',
        });
      } else {
        console.log(err);
        updateNotification({
          id: `delete-location-${location.id}`,
          title: 'Error',
          message: 'Something went wrong',
          color: 'red',
        });
      }
    }
  };

  return (
    <>
      <ModalDeleteLocation
        opened={modalOpened}
        confirmationText={location.name}
        onClose={modalHandlers.close}
        onConfirm={handleDelete}
      />
      <Card p='md' withBorder>
        <Stack spacing='xs'>
          <Title order={2}>{location.name}</Title>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Group spacing='xs' noWrap>
            <Link
              href={`/dashboard/locations/${location.id}`}
              passHref
              legacyBehavior
            >
              <Button
                leftIcon={<IconLiveView stroke={1.5} />}
                component='a'
                fullWidth
              >
                View
              </Button>
            </Link>
            <Button
              color='red'
              leftIcon={<IconTrash stroke={1.5} />}
              onClick={modalHandlers.open}
              fullWidth
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Card>
    </>
  );
};

const DashboardLocationsList = ({ locations }: Props) => {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 900, cols: 1 },
        { maxWidth: 1300, cols: 2 },
      ]}
    >
      {locations.map((location) => (
        <ListItem key={location.id} location={location} />
      ))}
    </SimpleGrid>
  );
};

export default DashboardLocationsList;
