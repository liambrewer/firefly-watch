import {
  AspectRatio,
  Button,
  Collapse,
  Modal,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconLocation } from '@tabler/icons';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SelectMapWithNoSSR = dynamic(() => import('../../maps/select-map'), {
  ssr: false,
});

type Props = {
  opened: boolean;
  confirmationText: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalDeleteLocation = ({
  opened,
  confirmationText,
  onClose,
  onConfirm,
}: Props) => {
  const [confirmation, setConfirmation] = useState('');

  const handleConfirm = () => {
    onConfirm();
    setConfirmation('');
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Delete Location'
      size='sm'
      centered
    >
      <Stack spacing='xs'>
        <Text size='sm'>
          Are you sure you want to delete your location? Current Observations
          will persist.
        </Text>
        <TextInput
          label={
            <Text span>
              Type{' '}
              <Text weight={700} span color='red'>
                {confirmationText}
              </Text>{' '}
              to confirm
            </Text>
          }
          value={confirmation}
          onChange={(event) => setConfirmation(event.currentTarget.value)}
          required
          placeholder='Type to confirm'
          data-autofocus
        />
        <Button variant='default' onClick={onClose}>
          Keep Location
        </Button>
        <Button
          color='red'
          onClick={handleConfirm}
          disabled={
            confirmation.toLowerCase() !== confirmationText.toLowerCase()
          }
        >
          Delete Location
        </Button>
      </Stack>
    </Modal>
  );
};

export default ModalDeleteLocation;
