import { SimpleGrid, Skeleton } from '@mantine/core';

const ListItemSkeleton = () => <Skeleton width='100%' height={175} />;

const DashboardLocationsListSkeleton = () => {
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: 900, cols: 1 },
        { maxWidth: 1300, cols: 2 },
      ]}
    >
      <ListItemSkeleton />
      <ListItemSkeleton />
      <ListItemSkeleton />
      <ListItemSkeleton />
    </SimpleGrid>
  );
};

export default DashboardLocationsListSkeleton;
