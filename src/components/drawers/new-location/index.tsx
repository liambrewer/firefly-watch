import { Drawer } from '@mantine/core';
import type { DrawerPosition } from '@mantine/core';
import FormNewLocation from '../../forms/new-location';

type Props = {
  opened: boolean;
  onClose: () => void;
  position?: DrawerPosition;
};

const DrawerNewLocation = ({ opened, onClose, position = 'left' }: Props) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title='New Location'
      position={position}
      padding='lg'
      size='lg'
    >
      <FormNewLocation />
    </Drawer>
  );
};

export default DrawerNewLocation;
