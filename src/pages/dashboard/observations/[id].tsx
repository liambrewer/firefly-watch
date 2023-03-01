import { Text } from '@mantine/core';
import { Observation, PrismaClient } from '@prisma/client';
import { IconArrowLeft } from '@tabler/icons-react';
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { NextPageWithAuth } from '../../../components/auth-guard';
import DashboardHeader from '../../../components/dashboard/header';
import DashboardHeaderLink from '../../../components/dashboard/header/link';
import getServerSession from '../../../utils/getServerSession';

type Props = {
  observation: Observation;
};

const Observation: NextPageWithAuth<Props> = ({ observation }) => {
  const date = new Date(observation.date);

  return (
    <>
      <DashboardHeader
        title={`Observation ${observation.id} on ${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`}
        color='violet'
        actions={
          <DashboardHeaderLink title='Back' href='/dashboard/observations'>
            <IconArrowLeft />
          </DashboardHeaderLink>
        }
        links={[
          {
            title: 'Observations',
            href: '/dashboard/observations',
          },
          {
            title: observation.id,
            href: `/dashboard/observations/${observation.id}`,
          },
        ]}
      />
      <Text>
        Latitude: {observation.latitude}, Longitude: {observation.longitude}
      </Text>
      <Text>
        Amount 1: {observation.amount1}, Amount 2: {observation.amount2}, Amount
        3: {observation.amount3}
      </Text>
      <Text>
        Date: {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}, Time:{' '}
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </Text>
      <Text>
        Habitat: {observation.habitat}, Mowed: {String(observation.mowed)}
      </Text>
      <Text>
        Temperature: {observation.temperature}, Precipitation:{' '}
        {observation.precipitation}, Wind: {observation.wind}, Cloud Cover:{' '}
        {observation.cloud}, Artificial Light: {observation.light}
      </Text>
      <Text>
        Pattern: {observation.pattern}, Pattern Description:{' '}
        {observation.patternDesc}
      </Text>
      <Text>Notes: {observation.notes}</Text>
    </>
  );
};

export default Observation;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const session = await getServerSession(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const prisma = new PrismaClient();

    const observation = await prisma.observation.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!observation) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        observation: JSON.parse(JSON.stringify(observation)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

Observation.requireAuth = true;
