import { AspectRatio, Box } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderAction from '../../../components/dashboard/header/action';
import useLocation from '../../../hooks/use-location';

const MarkerMapWithNoSSR = dynamic(
  () => import('../../../components/maps/marker-map'),
  {
    ssr: false,
  }
);

const Location: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: location,
    isError,
    isLoading,
    isValidating,
  } = useLocation(id as string);

  return (
    <>
      <DashboardHeader
        title={location?.name}
        error={isError ? isError.message : null}
        color='green'
        loading={isLoading || isValidating}
        action={
          <DashboardHeaderAction
            title='Back'
            onClick={() => router.replace('/dashboard/locations')}
          >
            <IconArrowLeft />
          </DashboardHeaderAction>
        }
      />
      {location && (
        <AspectRatio ratio={2 / 1}>
          <MarkerMapWithNoSSR
            markerPos={{
              lat: location?.latitude || 0,
              lng: location?.longitude || 0,
            }}
            satelite
          />
        </AspectRatio>
      )}
    </>
  );
};

export default Location;
