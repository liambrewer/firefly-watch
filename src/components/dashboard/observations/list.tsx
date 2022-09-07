import { Anchor, Badge, Skeleton, Table } from '@mantine/core';
import type { Observation } from '@prisma/client';
import moment from 'moment';
import Link from 'next/link';
import useLocation from '../../../hooks/use-location';

/*

TEMPORARY ------------------------------------------------------------------

*/

type ListItemProps = {
  observation: Observation;
};

const ListItem = ({ observation }: ListItemProps) => {
  const { data: location } = useLocation(observation.locationId);

  return (
    <tr>
      <td>
        <Link href={`/dashboard/observations/${observation.id}`}>
          <Anchor component='a'>{observation.id}</Anchor>
        </Link>
      </td>
      <td>
        {location?.name ? (
          <Link href={`/dashboard/locations/${location.id}`} passHref>
            <Badge component='a' variant='filled' sx={{ cursor: 'pointer' }}>
              {location?.name}
            </Badge>
          </Link>
        ) : (
          <Skeleton radius='xl' visible>
            <Badge>Loading...</Badge>
          </Skeleton>
        )}
      </td>
      <td>{observation.amount1}</td>
      <td>{observation.amount2}</td>
      <td>{observation.amount3}</td>
      <td>
        {Math.floor(
          (observation.amount1 + observation.amount2 + observation.amount3) / 3
        )}
      </td>
      <td>
        {moment(new Date(observation.date)).format('MM/DD/YYYY, h:mm:ss a')}
      </td>
    </tr>
  );
};

type Props = {
  observations: Observation[];
};

const DashboardObservationsList = ({ observations }: Props) => {
  return (
    <Table striped captionSide='bottom'>
      <caption>Your observations, sorted by latest to oldest.</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Amount 1</th>
          <th>Amount 2</th>
          <th>Amount 3</th>
          <th>Average</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {observations
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((observation) => (
            <ListItem key={observation.id} observation={observation} />
          ))}
      </tbody>
    </Table>
  );
};

export default DashboardObservationsList;
