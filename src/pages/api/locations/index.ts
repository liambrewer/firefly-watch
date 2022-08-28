import { Location, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from '../../../utils/getServerSession';

type Data = {
  locations: Location[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { session, user } = await getServerSession(req, res);

  if (!session || !user) return res.status(401).json({ locations: [] });

  const prisma = new PrismaClient();
  const locations = await prisma.location.findMany({
    where: {
      userId: user.id,
    },
  });

  res.status(200).json({ locations: locations });
};

export default handler;
