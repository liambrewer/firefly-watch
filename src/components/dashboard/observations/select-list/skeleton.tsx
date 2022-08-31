import { Skeleton, Stack } from '@mantine/core';

const ListItem = () => {
  return <Skeleton height={75} />;
};

const DashboardObservationsSelectListSkeleton = () => {
  return (
    <Stack>
      <ListItem />
      <ListItem />
      <ListItem />
    </Stack>
  );
};

export default DashboardObservationsSelectListSkeleton;
