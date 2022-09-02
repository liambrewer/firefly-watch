import { Anchor, Text } from '@mantine/core';
import { IconX } from '@tabler/icons';
import Link from 'next/link';
import { NextPageWithAuth } from '../../../../components/auth-guard';
import DashboardHeader from '../../../../components/dashboard/header';
import DashboardHeaderLink from '../../../../components/dashboard/header/link';
import DashboardObservationsSelectList from '../../../../components/dashboard/observations/select-list';
import DashboardObservationsSelectListSkeleton from '../../../../components/dashboard/observations/select-list/skeleton';
import useLocations from '../../../../hooks/use-locations';

const SelectLocation: NextPageWithAuth = () => {
  const { data: locations, isLoading, isError, isValidating } = useLocations();

  return (
    <>
      <DashboardHeader
        title='Select Location'
        error={isError ? isError.message : null}
        color='violet'
        loading={isLoading || isValidating}
        actions={
          <DashboardHeaderLink title='Cancel' href='/dashboard/observations'>
            <IconX />
          </DashboardHeaderLink>
        }
        links={[
          {
            title: 'Observations',
            href: '/dashboard/observations',
          },
          {
            title: 'New',
            href: '/dashboard/observations/new',
          },
        ]}
      />
      {isLoading ? (
        <DashboardObservationsSelectListSkeleton />
      ) : locations && locations.length > 0 ? (
        <DashboardObservationsSelectList locations={locations} />
      ) : (
        <Text>
          No locations found.{' '}
          <Link href='/dashboard/locations' passHref>
            <Anchor component='a'>Create one to submit an observation.</Anchor>
          </Link>
        </Text>
      )}
    </>
  );
};

export default SelectLocation;

SelectLocation.requireAuth = true;
