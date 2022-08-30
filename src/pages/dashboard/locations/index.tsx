import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLocation } from '@tabler/icons';
import type { NextPage } from 'next';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderAction from '../../../components/dashboard/header/action';
import DashboardLocationsList from '../../../components/dashboard/locations/list';
import DashboardLocationsListSkeleton from '../../../components/dashboard/locations/list-skeleton';
import DrawerNewLocation from '../../../components/drawers/new-location';
import useLocations from '../../../hooks/use-locations';

const Locations: NextPage = () => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

  const { data: locations, isLoading, isError, isValidating } = useLocations();

  return (
    <>
      <DrawerNewLocation
        opened={modalOpened}
        onClose={modalHandlers.close}
        position='right'
      />
      <DashboardHeader
        title='Locations'
        error={isError ? isError.message : null}
        color='green'
        loading={isLoading || isValidating}
        actions={
          <DashboardHeaderAction
            title='New Location'
            onClick={modalHandlers.open}
          >
            <IconLocation />
          </DashboardHeaderAction>
        }
      />
      {isLoading ? (
        <DashboardLocationsListSkeleton />
      ) : locations && locations.length > 0 ? (
        <DashboardLocationsList locations={locations} />
      ) : (
        <Text>No locations found.</Text>
      )}
    </>
  );
};

export default Locations;
