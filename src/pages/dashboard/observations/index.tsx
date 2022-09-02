import { Text } from '@mantine/core';
import { IconPencilPlus } from '@tabler/icons';
import { NextPageWithAuth } from '../../../components/auth-guard';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';
import DashboardLocationsListSkeleton from '../../../components/dashboard/locations/list-skeleton';
import DashboardObservationsList from '../../../components/dashboard/observations/list';
import useObservations from '../../../hooks/use-observations';

const Observations: NextPageWithAuth = () => {
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
        links={[
          {
            title: 'Observations',
            href: '/dashboard/observations',
          },
        ]}
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

Observations.requireAuth = true;
