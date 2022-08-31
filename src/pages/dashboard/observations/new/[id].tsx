import { Location, PrismaClient } from '@prisma/client';
import { IconX } from '@tabler/icons';
import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { NextPageWithAuth } from '../../../../components/auth-guard';
import DashboardHeader from '../../../../components/dashboard/header';
import DashboardHeaderLink from '../../../../components/dashboard/header/link';
import FormNewObservation from '../../../../components/forms/new-observation';
import getServerSession from '../../../../utils/getServerSession';

type Props = {
  location: Location;
};

const NewObservation: NextPageWithAuth<Props> = ({ location }) => {
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
      />
      <FormNewObservation location={location} />
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
