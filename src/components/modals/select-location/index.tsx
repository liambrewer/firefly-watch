import {
  AspectRatio,
  Button,
  Collapse,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCurrentLocation, IconLocation } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SelectMapWithNoSSR = dynamic(() => import('../../maps/select-map'), {
  ssr: false,
});

type Props = {
  opened: boolean;
  onClose: () => void;
  onSelect: (value: { lat: number; lng: number }) => void;
};

const ModalSelectLocation = ({ opened, onClose, onSelect }: Props) => {
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const [mapType, setMapType] = useState<'street' | 'satellite'>('street');

  const handleClose = () => {
    latlng && onSelect(latlng);
    setLatlng(null);
    onClose();
  };

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatlng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        showNotification({
          title: 'Location Found',
          message: 'Check the map to confirm your location',
          color: 'green',
        });
      },
      (err) => {
        showNotification({
          title: 'Location Error',
          message: err.message,
          color: 'red',
        });
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Select Location'
      size='xl'
    >
      <Stack>
        <Group grow>
          <SegmentedControl
            data={[
              { label: 'Street', value: 'street' },
              { label: 'Satellite', value: 'satellite' },
            ]}
            value={mapType}
            onChange={(value) => setMapType(value as 'street' | 'satellite')}
            transitionDuration={500}
          />
          {'geolocation' in navigator && (
            <Button
              variant='default'
              leftIcon={<IconCurrentLocation size={16} />}
              onClick={handleGeoLocation}
            >
              Acquire Location
            </Button>
          )}
        </Group>
        <AspectRatio ratio={16 / 9}>
          <SelectMapWithNoSSR
            handleClick={(value) => setLatlng(value)}
            markerPos={latlng}
            satelite={mapType === 'satellite'}
          />
        </AspectRatio>
        <Collapse in={latlng !== null}>
          <Stack spacing='xs'>
            <Text weight={500}>Latitude: {latlng?.lat}</Text>
            <Text weight={500}>Longitude: {latlng?.lng}</Text>
            <Button
              onClick={handleClose}
              leftIcon={<IconLocation size={16} />}
              disabled={latlng === null}
              fullWidth
            >
              Select Location
            </Button>
          </Stack>
        </Collapse>
      </Stack>
    </Modal>
  );
};

export default ModalSelectLocation;
