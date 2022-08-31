import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import {
  Artificial_light_type,
  Cloud_type,
  Habitat_type,
  Observation,
  Pattern_type,
  Precipitation_type,
  PrismaClient,
  Wind_type,
} from '@prisma/client';
import getServerSession from '../../../utils/getServerSession';
import formidable, { Fields, Files } from 'formidable';
import { observationSchema } from '../../../components/forms/new-observation';

type ObservationFormData = {
  date: Date;
  time: Date;
  amount1: number;
  amount2: number;
  amount3: number;
  habitat: Habitat_type;
  mowed: boolean;
  temperature: number;
  precipitation: Precipitation_type;
  wind: Wind_type;
  cloud: Cloud_type;
  light: Artificial_light_type;
  pattern: Pattern_type;
  patternDesc: string;
  notes: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc<
  NextApiRequest,
  NextApiResponse<Observation[] | Observation>
>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.post(async (req, res) => {
  const session = await getServerSession(req, res);

  if (!session) return res.status(401).end('Unauthorized');

  const id = req.query.locationId as string;

  const prisma = new PrismaClient();

  try {
    const location = await prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) return res.status(404).end('Location not found');

    if (location.userId !== session.user.id)
      return res.status(401).end('Unauthorized');

    let formData: { fields: Fields | ObservationFormData; files: Files };

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

    const {
      date,
      time,
      amount1,
      amount2,
      amount3,
      habitat,
      mowed,
      temperature,
      precipitation,
      wind,
      cloud,
      light,
      pattern,
      patternDesc,
      notes,
    } = formData.fields as ObservationFormData;

    try {
      await observationSchema.validate({
        date,
        time,
        amount1,
        amount2,
        amount3,
        habitat,
        mowed,
        temperature,
        precipitation,
        wind,
        cloud,
        light,
        pattern,
        patternDesc,
        notes,
      });
    } catch (err) {
      console.error(err);
      return res.status(400).end('Bad Request');
    }

    try {
      const observation = await prisma.observation.create({
        data: {
          userId: session.user.id,
          locationId: id,
          latitude: location.latitude,
          longitude: location.longitude,
          date,
          time,
          amount1: Number(amount1),
          amount2: Number(amount2),
          amount3: Number(amount3),
          habitat,
          mowed: Boolean(mowed),
          temperature: Number(temperature),
          precipitation,
          wind,
          cloud,
          light,
          pattern,
          patternDesc,
          notes,
        },
      });

      res.status(200).json(observation);
    } catch (error) {
      console.error(error);
      res.status(500).end('Internal Server Error');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).end('Internal Server Error');
  }
});

export default handler;
