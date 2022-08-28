import type { Location } from '@prisma/client';

type Props = {
  locations: Location[];
};

const DashboardLocationsList = ({ locations }: Props) => {
  return (
    <>
      {locations.map((location) => (
        <h1 key={location.id}>{location.name}</h1>
      ))}
    </>
  );
};

export default DashboardLocationsList;
