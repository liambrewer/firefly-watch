import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession, User } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const getServerSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{
  session: Session | null;
  user: User | null;
}> => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) return { session: null, user: null };

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });

  return {
    session: session,
    user: user,
  };
};

export default getServerSession;
