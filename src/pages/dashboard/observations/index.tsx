import { IconPencilPlus } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';

const Observations: NextPage = () => {
  return (
    <DashboardHeader
      title='Observations'
      color='violet'
      actions={
        <DashboardHeaderLink
          title='New Observation'
          href='/dashboard/observations/new'
        >
          <IconPencilPlus />
        </DashboardHeaderLink>
      }
    />
  );
};

export default Observations;
