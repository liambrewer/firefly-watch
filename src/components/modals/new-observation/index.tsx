import { Modal } from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: () => void;
};

const ModalNewObservation = ({ opened, onClose }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title='New Observation'></Modal>
  );
};

export default ModalNewObservation;
