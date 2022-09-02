import { AspectRatio } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextPageWithAuth } from '../../../components/auth-guard';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';
import useLocation from '../../../hooks/use-location';

const MarkerMapWithNoSSR = dynamic(
  () => import('../../../components/maps/marker-map'),
  {
    ssr: false,
  }
);

const Location: NextPageWithAuth = () => {
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
        actions={
          <DashboardHeaderLink title='Back' href='/dashboard/locations'>
            <IconArrowLeft />
          </DashboardHeaderLink>
        }
        links={[
          {
            title: 'Locations',
            href: '/dashboard/locations',
          },
          {
            title: location?.name ?? 'Loading...',
            href: `/dashboard/locations/${id}`,
          },
        ]}
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

Location.requireAuth = true;
