import { Location, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import getServerSession from '../../../utils/getServerSession';

const handler = nc<NextApiRequest, NextApiResponse<Location>>({
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

    const location = await prisma.location.findUnique({
      where: {
        id: req.query.id as string,
      },
    });

    if (!location) return res.status(404).end('Not found');

    res.status(200).json(location);
  } catch (err) {
    console.error(err);

    res.status(500).end('Internal server error');
  }
});

handler.delete(async (req, res) => {
  const session = getServerSession(req, res);

  if (!session) return res.status(401).end('Unauthorized');

  try {
    const prisma = new PrismaClient();

    const location = await prisma.location.delete({
      where: {
        id: req.query.id as string,
      },
    });

    res.status(200).json(location);
  } catch (err) {
    console.error(err);
    res.status(500).end('Internal server error');
  }
});

export default handler;
