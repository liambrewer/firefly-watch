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

    // res.status(200).json(observations);

    // Placeholder data
    res.status(200).json([
      {
        id: '1',
        userId: '1',
        locationId: '1',
        longitude: 0,
        latitude: 0,
        amount1: 5,
        amount2: 7,
        amount3: 9,
        time: new Date(),
        habitat: 'forest',
        mowed: false,
        temperature: 65.4,
        precipitation: 'heavy_rain',
        wind: 'strong',
        cloud: 'overcast',
        light: 'near_habitat',
        pattern: 'three',
        patternDesc: 'none',
        notes: 'none',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (err) {
    console.error(err);
    res.status(500).end('Internal Server Error');
  }
});

export default handler;
