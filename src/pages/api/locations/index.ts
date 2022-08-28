import { Location, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from '../../../utils/getServerSession';

type Data = {
  locations: Location[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getServerSession(req, res);

  if (!session) return res.status(401).json({ locations: [] });

  const prisma = new PrismaClient();
  const locations = await prisma.location.findMany({
    where: {
      userId: session.user.id,
    },
  });

  res.status(200).json({ locations: locations });
};

export default handler;
