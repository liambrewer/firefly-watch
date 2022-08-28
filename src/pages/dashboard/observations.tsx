import { useDisclosure } from '@mantine/hooks';
import { IconPencilPlus } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../components/dashboard/header';
import DashboardHeaderAction from '../../components/dashboard/header/action';
import ModalNewObservation from '../../components/modals/new-observation';

const Observations: NextPage = () => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <ModalNewObservation opened={modalOpened} onClose={modalHandlers.close} />
      <DashboardHeader
        title='Observations'
        action={
          <DashboardHeaderAction
            title='New Observation'
            onClick={modalHandlers.open}
          >
            <IconPencilPlus />
          </DashboardHeaderAction>
        }
      />
    </>
  );
};

export default Observations;
