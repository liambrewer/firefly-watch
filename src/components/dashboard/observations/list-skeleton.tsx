import { Skeleton, Stack } from '@mantine/core';

const ListItem = () => <Skeleton width='100%' height={30} />;

const DashboardObservationsListSkeleton = () => {
  return (
    <Stack spacing='xs'>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </Stack>
  );
};

export default DashboardObservationsListSkeleton;
