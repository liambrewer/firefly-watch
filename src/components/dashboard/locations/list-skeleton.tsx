import { Skeleton, Stack } from '@mantine/core';

const ListItemSkeleton = () => <Skeleton width='100%' height={150} />;

const DashboardLocationsListSkeleton = () => {
  return (
    <Stack>
      <ListItemSkeleton />
      <ListItemSkeleton />
      <ListItemSkeleton />
    </Stack>
  );
};

export default DashboardLocationsListSkeleton;
