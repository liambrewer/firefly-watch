import { Location, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from '../../../utils/getServerSession';
import nc from 'next-connect';
import formidable from 'formidable';
import type { Fields, Files } from 'formidable';
import { locationSchema } from '../../../components/forms/new-location';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<
  NextApiRequest,
  NextApiResponse<Location[] | Location | null>
>({
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

  if (!session) return res.status(401).json([]);

  try {
    const prisma = new PrismaClient();

    const locations = await prisma.location.findMany({
      where: {
        userId: session.user.id,
      },
    });

    res.status(200).json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

handler.post(async (req, res) => {
  const session = await getServerSession(req, res);

  if (!session) return res.status(401).end('Unauthorized');

  let formData: { fields: Fields; files: Files };

  try {
    formData = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end('Internal Server Error');
  }

  const { name, latitude, longitude } = formData.fields;

  try {
    await locationSchema.validate({ name, latitude, longitude });
  } catch (err) {
    console.error(err);
    return res.status(400).end('Bad Request');
  }

  try {
    const prisma = new PrismaClient();

    const location = await prisma.location.create({
      data: {
        name: name as string,
        latitude: Number(latitude),
        longitude: Number(longitude),
        userId: session.user.id,
      },
    });

    res.status(200).json(location);
  } catch (err) {
    console.error(err);
    res.status(500).end('Internal Server Error');
  }
});

export default handler;
