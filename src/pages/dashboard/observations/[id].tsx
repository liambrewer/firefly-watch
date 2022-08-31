import { IconArrowLeft, IconPencilPlus } from '@tabler/icons';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';

const Observation: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DashboardHeader
        title={`Observation: ${id}`}
        color='violet'
        actions={
          <DashboardHeaderLink title='Back' href='/dashboard/observations'>
            <IconArrowLeft />
          </DashboardHeaderLink>
        }
      />
    </>
  );
};

export default Observation;
