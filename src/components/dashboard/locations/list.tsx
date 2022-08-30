import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import type { Location } from '@prisma/client';
import { IconLiveView, IconTrashX } from '@tabler/icons';
import axios from 'axios';
import type { AxiosError } from 'axios';
import { mutate } from 'swr';
import ModalDeleteLocation from '../../modals/delete-location';

type Props = {
  locations: Location[];
};

const ListItem = ({ location }: { location: Location }) => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

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
      mutate('/api/locations');
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
      <Paper p='md'>
        <Stack spacing='xs'>
          <Title>{location.name}</Title>
          <Text>Latitude: {location.latitude}</Text>
          <Text>Longitude: {location.longitude}</Text>
          <Group>
            <Button leftIcon={<IconLiveView stroke={1.5} />}>View</Button>
            <Button
              color='red'
              leftIcon={<IconTrashX stroke={1.5} />}
              onClick={modalHandlers.open}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Paper>
    </>
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
