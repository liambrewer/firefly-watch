import {
  AspectRatio,
  Button,
  Collapse,
  Modal,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { IconLocation } from '@tabler/icons';
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

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title='Select Location'
      size='xl'
    >
      <Stack>
        <SegmentedControl
          data={[
            { label: 'Street', value: 'street' },
            { label: 'Satellite', value: 'satellite' },
          ]}
          value={mapType}
          onChange={(value) => setMapType(value as 'street' | 'satellite')}
        />
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