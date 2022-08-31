import { Text } from '@mantine/core';
import { IconPencilPlus } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';
import DashboardLocationsListSkeleton from '../../../components/dashboard/locations/list-skeleton';
import DashboardObservationsList from '../../../components/dashboard/observations/list';
import useObservations from '../../../hooks/use-observations';

const Observations: NextPage = () => {
  const {
    data: observations,
    isLoading,
    isError,
    isValidating,
  } = useObservations();

  return (
    <>
      <DashboardHeader
        title='Observations'
        color='violet'
        loading={isLoading || isValidating}
        actions={
          <DashboardHeaderLink
            title='New Observation'
            href='/dashboard/observations/new'
          >
            <IconPencilPlus />
          </DashboardHeaderLink>
        }
      />
      {isLoading ? (
        <DashboardLocationsListSkeleton />
      ) : observations && observations.length > 0 ? (
        <DashboardObservationsList observations={observations} />
      ) : (
        <Text>No observations found.</Text>
      )}
    </>
  );
};

export default Observations;
