import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Observation, PrismaClient } from '@prisma/client';
import getServerSession from '../../../utils/getServerSession';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<NextApiRequest, NextApiResponse<Observation[]>>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.get(async (req, res) => {
  const session = await getServerSession(req, res);

  if (!session) return res.status(401).end('Unauthorized');

  try {
    const prisma = new PrismaClient();

    const observations = await prisma.observation.findMany({
      where: {
        userId: session.user.id,
      },
    });

    res.status(200).json(observations);
  } catch (err) {
    console.error(err);
    res.status(500).end('Internal Server Error');
  }
});

export default handler;
