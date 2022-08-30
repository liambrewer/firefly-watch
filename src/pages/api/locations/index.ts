import { Location, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from '../../../utils/getServerSession';
import nc from 'next-connect';
import formidable from 'formidable';
import type { Fields, Files } from 'formidable';
import * as yup from 'yup';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<NextApiRequest, NextApiResponse<Location[]>>({
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

  const prisma = new PrismaClient();

  const locations = await prisma.location.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // Placeholder Data

  // res.status(200).json([
  //   {
  //     id: '1',
  //     name: 'Home',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     userId: '1',
  //     latitude: 0,
  //     longitude: 0,
  //   },
  //   {
  //     id: '2',
  //     name: 'Work',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     userId: '1',
  //     latitude: 0,
  //     longitude: 0,
  //   },
  // ]);

  res.status(200).json(locations);
});

handler.post(async (req, res) => {
  const session = await getServerSession(req, res);

  if (!session) return res.status(401).json([]);

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
    return res.status(500).json([]);
  }

  const { name, latitude, longitude } = formData.fields;

  const schema = yup.object().shape({
    name: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  });

  try {
    await schema.validate({ name, latitude, longitude });
  } catch (err) {
    console.error(err);
    return res.status(400).json([]);
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

    res.status(200).json([location]);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

export default handler;
