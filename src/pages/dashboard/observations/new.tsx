import { IconX } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';

const NewObservation: NextPage = () => {
  return (
    <DashboardHeader
      title='New Observation'
      color='violet'
      actions={
        <DashboardHeaderLink title='Cancel' href='/dashboard/observations'>
          <IconX />
        </DashboardHeaderLink>
      }
    />
  );
};

export default NewObservation;
