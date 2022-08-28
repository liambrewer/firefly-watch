import { Location, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from '../../../utils/getServerSession';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Location[]>
) => {
  const session = await getServerSession(req, res);

  if (!session) return res.status(401).json([]);

  const prisma = new PrismaClient();
  const locations = await prisma.location.findMany({
    where: {
      userId: session.user.id,
    },
  });

  res.status(200).json([
    {
      id: '1',
      name: 'Home',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      latitude: 0,
      longitude: 0,
    },
    {
      id: '2',
      name: 'Work',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      latitude: 0,
      longitude: 0,
    },
  ]);
};

export default handler;
