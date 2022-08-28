import { Modal } from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: () => void;
};

const ModalNewLocation = ({ opened, onClose }: Props) => {
  return <Modal opened={opened} onClose={onClose} title='New Location'></Modal>;
};

export default ModalNewLocation;
