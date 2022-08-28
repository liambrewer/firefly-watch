import { useDisclosure } from '@mantine/hooks';
import { IconLocation } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderAction from '../../../components/dashboard/header/action';
import DrawerNewLocation from '../../../components/drawers/new-location';

const Locations: NextPage = () => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <DrawerNewLocation
        opened={modalOpened}
        onClose={modalHandlers.close}
        position='right'
      />
      <DashboardHeader
        title='Locations'
        color='green'
        action={
          <DashboardHeaderAction
            title='New Location'
            onClick={modalHandlers.open}
          >
            <IconLocation />
          </DashboardHeaderAction>
        }
      />
    </>
  );
};

export default Locations;
