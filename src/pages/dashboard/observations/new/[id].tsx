import { Center, Group, ThemeIcon, Title } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { Location, Observation, PrismaClient } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithAuth } from '../../../../components/auth-guard';
import DashboardHeader from '../../../../components/dashboard/header';
import DashboardHeaderLink from '../../../../components/dashboard/header/link';
import FormNewObservation from '../../../../components/forms/new-observation';
import getServerSession from '../../../../utils/getServerSession';

type Props = {
  location: Location;
};

const NewObservation: NextPageWithAuth<Props> = ({ location }) => {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (observation: Observation) => {
    scrollTo({ y: 0 });
    setSubmitted(true);
    router.replace(`/dashboard/observations/${observation.id}`);
  };

  return (
    <>
      <DashboardHeader
        title={`New Observation at ${location.name}`}
        color='violet'
        actions={
          <DashboardHeaderLink title='Cancel' href='/dashboard/observations'>
            <IconX />
          </DashboardHeaderLink>
        }
        links={[
          {
            title: 'Observations',
            href: '/dashboard/observations',
          },
          {
            title: 'New',
            href: '/dashboard/observations/new',
          },
          {
            title: location.name,
            href: `/dashboard/observations/new/${location.id}`,
          },
        ]}
      />
      {submitted ? (
        <Center>
          <Group>
            <ThemeIcon size='xl' color='green'>
              <IconCheck />
            </ThemeIcon>
            <Title order={2}>
              Your observation has been submitted, thanks for your contribution!
            </Title>
          </Group>
        </Center>
      ) : (
        <FormNewObservation location={location} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default NewObservation;

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

    const location = await prisma.location.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!location) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        location: JSON.parse(JSON.stringify(location)),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

NewObservation.requireAuth = true;
