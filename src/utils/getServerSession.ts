import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

const getServerSession = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session | null> => {
  return await unstable_getServerSession(req, res, authOptions);
};

export default getServerSession;
