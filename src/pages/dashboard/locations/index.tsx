import { useDisclosure } from '@mantine/hooks';
import { IconLocation } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderAction from '../../../components/dashboard/header/action';
import ModalNewLocation from '../../../components/modals/new-location';

const Locations: NextPage = () => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <ModalNewLocation opened={modalOpened} onClose={modalHandlers.close} />
      <DashboardHeader
        title='Locations'
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
