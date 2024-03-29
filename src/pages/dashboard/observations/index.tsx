import { Text } from '@mantine/core';
import { IconPencilPlus } from '@tabler/icons-react';
import { NextPageWithAuth } from '../../../components/auth-guard';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';
import DashboardObservationsList from '../../../components/dashboard/observations/list';
import DashboardObservationsListSkeleton from '../../../components/dashboard/observations/list-skeleton';
import useObservations from '../../../hooks/use-observations';

const Observations: NextPageWithAuth = () => {
  const { data: observations, isLoading, isValidating } = useObservations();

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
        <DashboardObservationsListSkeleton />
      ) : observations && observations.length > 0 ? (
        <DashboardObservationsList observations={observations} />
      ) : (
        <Text>
          No observations found. Click the pencil in the top right to create
          one.
        </Text>
      )}
    </>
  );
};

export default Observations;

Observations.requireAuth = true;
