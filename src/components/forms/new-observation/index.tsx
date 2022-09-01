import {
  Anchor,
  Button,
  Divider,
  NumberInput,
  Radio,
  Select,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { showNotification, updateNotification } from '@mantine/notifications';
import {
  Artificial_light_type,
  Cloud_type,
  Habitat_type,
  Location,
  Observation,
  Pattern_type,
  Precipitation_type,
  Wind_type,
} from '@prisma/client';
import { IconCalendarTime, IconEye } from '@tabler/icons';
import axios, { AxiosError } from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import useObservations from '../../../hooks/use-observations';

export const observationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  time: Yup.date().required('Time is required'),
  amount1: Yup.number()
    .required('Required')
    .min(0, "You can't see a negative amount of fireflies...")
    .max(25, "That's a lot of fireflies!"),
  amount2: Yup.number()
    .required('Required')
    .min(0, "You can't see a negative amount of fireflies...")
    .max(25, "That's a lot of fireflies!"),
  amount3: Yup.number()
    .required('Required')
    .min(0, "You can't see a negative amount of fireflies...")
    .max(25, "That's a lot of fireflies!"),
  habitat: Yup.mixed<Habitat_type>()
    .oneOf(Object.values(Habitat_type))
    .required('Required'),
  mowed: Yup.boolean().required('Required'),
  temperature: Yup.number()
    .required('Required')
    .min(0, 'Brrrrr...')
    .max(120, 'That is hot! (or you have a broken thermometer)'),
  precipitation: Yup.mixed<Precipitation_type>()
    .oneOf(Object.values(Precipitation_type))
    .required('Required'),
  wind: Yup.mixed<Wind_type>()
    .oneOf(Object.values(Wind_type))
    .required('Required'),
  cloud: Yup.mixed<Cloud_type>()
    .oneOf(Object.values(Cloud_type))
    .required('Required'),
  light: Yup.mixed<Artificial_light_type>()
    .oneOf(Object.values(Artificial_light_type))
    .required('Required'),
  pattern: Yup.mixed<Pattern_type>()
    .oneOf(Object.values(Pattern_type))
    .required('Required'),
  patternDesc: Yup.string().required('Required').max(200),
  notes: Yup.string().max(
    400,
    'We appreciate your enthusiasm, but 400 characters is the limit.'
  ),
});

type InitialValues = {
  date?: Date;
  time?: Date;
  amount1?: number;
  amount2?: number;
  amount3?: number;
  habitat?: Habitat_type;
  mowed?: boolean;
  temperature?: number;
  precipitation?: Precipitation_type;
  wind?: Wind_type;
  cloud?: Cloud_type;
  light?: Artificial_light_type;
  pattern?: Pattern_type;
  patternDesc?: string;
  notes?: string;
};

type Props = {
  location: Location;
  onSubmit?: (observation: Observation) => void;
};

const FormNewObservation = ({ location, onSubmit }: Props) => {
  const router = useRouter();

  const { data: observations, mutate } = useObservations();

  const initialValues: InitialValues = {
    date: undefined,
    time: undefined,
    amount1: undefined,
    amount2: undefined,
    amount3: undefined,
    habitat: undefined,
    mowed: undefined,
    temperature: undefined,
    precipitation: undefined,
    wind: undefined,
    cloud: undefined,
    light: undefined,
    pattern: undefined,
    patternDesc: undefined,
    notes: undefined,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={observationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          showNotification({
            id: 'new-observation',
            title: `Submitting Observation`,
            message: 'Please wait...',
            loading: true,
            autoClose: false,
            disallowClose: true,
          });

          const res = await axios.post<Observation>(
            `/api/observations/${location.id}`,
            values,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );

          // Optimistically update the observations list
          const newObservations = observations
            ? [...observations, res.data]
            : [res.data];
          mutate(newObservations);

          // Update the notification
          updateNotification({
            id: 'new-observation',
            title: `Created Observation: ${res.data.id}`,
            message: 'Observation submitted successfully',
            color: 'green',
          });

          onSubmit && onSubmit(res.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const error = err as AxiosError;
            updateNotification({
              id: 'new-observation',
              title: 'Error',
              message: error.response?.statusText,
              color: 'red',
            });
          } else {
            console.log(err);
            updateNotification({
              id: 'new-observation',
              title: 'Error',
              message: 'Something went wrong',
              color: 'red',
            });
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Stack spacing='xs'>
            <Text weight={500}>
              Before observing fireflies, please read the{' '}
              <Link href='/about' passHref>
                <Anchor component='a'>About</Anchor>
              </Link>{' '}
              page.
            </Text>
            <Divider />
            <Text>Select the date and time of the observation.</Text>
            <Button
              variant='default'
              size='lg'
              leftIcon={<IconCalendarTime />}
              onClick={() => {
                setFieldValue('date', new Date());
                setFieldValue('time', new Date());
              }}
            >
              Fill in the current date and time
            </Button>
            <DatePicker
              label='Observation Date'
              name='date'
              description='The date of the observation.'
              placeholder='Select a date'
              value={values.date}
              onChange={(date) => setFieldValue('date', date)}
              onBlur={handleBlur}
              error={touched.date && errors.date}
              required
              clearable={false}
            />
            <TimeInput
              label='Observation Time'
              name='time'
              description='The time of the observation.'
              placeholder='Select a time'
              format='12'
              value={values.time}
              onChange={(value) => setFieldValue('time', value)}
              onBlur={handleBlur}
              error={touched.time && errors.time}
              required
            />
            <Divider />
            <Text>
              Record the amount of flashes seen in a 10 second period 3 times.
              Then fill out the following questions.
            </Text>
            <NumberInput
              label='Observation 1'
              name='amount1'
              description='Flashes seen on the first 10 second period'
              placeholder='0-25'
              value={values.amount1}
              onChange={(value) => setFieldValue('amount1', value)}
              onBlur={handleBlur}
              error={touched.amount1 && errors.amount1}
              required
              disabled={isSubmitting}
            />
            <NumberInput
              label='Observation 2'
              name='amount2'
              description='Flashes seen on the second 10 second period'
              placeholder='0-25'
              value={values.amount2}
              onChange={(value) => setFieldValue('amount2', value)}
              onBlur={handleBlur}
              error={touched.amount2 && errors.amount2}
              required
              disabled={isSubmitting}
            />
            <NumberInput
              label='Observation 3'
              name='amount3'
              description='Flashes seen on the third 10 second period'
              placeholder='0-25'
              value={values.amount3}
              onChange={(value) => setFieldValue('amount3', value)}
              onBlur={handleBlur}
              error={touched.amount3 && errors.amount3}
              required
              disabled={isSubmitting}
            />
            <Select
              label='Amount of flash patterns seen'
              name='pattern'
              description='How many different flash patterns did you see?'
              placeholder='Select an option'
              value={values.pattern}
              onChange={(value) => setFieldValue('pattern', value)}
              onBlur={handleBlur}
              error={touched.pattern && errors.pattern}
              required
              data={Object.values(Pattern_type).map((value) => ({
                value: value,
                label: value,
              }))}
              disabled={isSubmitting}
            />
            <Textarea
              label='Flash pattern description'
              name='patternDesc'
              description='Describe the flash patterns you saw'
              placeholder='Describe the flash patterns you saw'
              value={values.patternDesc}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.patternDesc && errors.patternDesc}
              required
              autosize
              minRows={2}
              disabled={isSubmitting}
            />
            <Divider />
            <Text>
              Take a look around! What kind of habitat did you observe the
              fireflies in?
            </Text>
            <Select
              label='Habitat'
              name='habitat'
              description='Select the habitat type'
              placeholder='Habitat Type'
              value={values.habitat}
              onChange={(value) => setFieldValue('habitat', value)}
              onBlur={handleBlur}
              error={touched.habitat && errors.habitat}
              required
              data={Object.values(Habitat_type).map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isSubmitting}
            />
            <Radio.Group
              label='Mowed'
              description='Was the habitat mowed recently?'
              orientation='vertical'
              required
              onBlur={handleBlur}
              error={touched.mowed && errors.mowed}
              value={
                values.mowed === true
                  ? 'yes'
                  : values.mowed === false
                  ? 'no'
                  : undefined
              }
              onChange={(value) =>
                setFieldValue('mowed', value === 'yes' ? true : false)
              }
            >
              <Radio value='yes' label='Yes' disabled={isSubmitting} />
              <Radio value='no' label='No' disabled={isSubmitting} />
            </Radio.Group>
            <Divider />
            <Text>
              What was the environment like when you observed the fireflies?
            </Text>
            <NumberInput
              label='Temperature'
              name='temperature'
              description='Temperature in degrees Fahrenheit (°F)'
              placeholder='0-120'
              value={values.temperature}
              onChange={(value) => setFieldValue('temperature', value)}
              onBlur={handleBlur}
              error={touched.temperature && errors.temperature}
              required
              disabled={isSubmitting}
            />
            <Select
              label='Precipitation'
              name='precipitation'
              description='Select the precipitation type'
              placeholder='Precipitation Type'
              value={values.precipitation}
              onChange={(value) => setFieldValue('precipitation', value)}
              onBlur={handleBlur}
              error={touched.precipitation && errors.precipitation}
              required
              data={Object.values(Precipitation_type).map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isSubmitting}
            />
            <Select
              label='Wind'
              name='wind'
              description='Select the wind type'
              placeholder='Wind Type'
              value={values.wind}
              onChange={(value) => setFieldValue('wind', value)}
              onBlur={handleBlur}
              error={touched.wind && errors.wind}
              required
              data={Object.values(Wind_type).map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isSubmitting}
            />
            <Select
              label='Clouds'
              name='cloud'
              description='Select the cloud type'
              placeholder='Cloud Type'
              value={values.cloud}
              onChange={(value) => setFieldValue('cloud', value)}
              onBlur={handleBlur}
              error={touched.cloud && errors.cloud}
              required
              data={Object.values(Cloud_type).map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isSubmitting}
            />
            <Select
              label='Artificial Light'
              name='light'
              description='Select the artificial light type'
              placeholder='Artificial Light Type'
              value={values.light}
              onChange={(value) => setFieldValue('light', value)}
              onBlur={handleBlur}
              error={touched.light && errors.light}
              required
              data={Object.values(Artificial_light_type).map((type) => ({
                value: type,
                label: type,
              }))}
              disabled={isSubmitting}
            />
            <Divider />
            <Text>
              Do you have any other comments about the observation you made?
            </Text>
            <Textarea
              label='Notes'
              name='notes'
              description='Any other comments about the observation you made?'
              placeholder='Any other comments about the observation you made?'
              value={values.notes}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.notes && errors.notes}
              autosize
              minRows={4}
              disabled={isSubmitting}
            />
            <Divider />
            <Button type='submit' leftIcon={<IconEye />} loading={isSubmitting}>
              Submit Observation
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
};

export default FormNewObservation;
