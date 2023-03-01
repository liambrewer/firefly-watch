import { Button, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Location } from '@prisma/client';
import { IconCurrentLocation } from '@tabler/icons-react';
import axios, { AxiosError } from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useLocations from '../../../hooks/use-locations';
import ModalSelectLocation from '../../modals/select-location';

export const locationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(64, 'Name is too long'),
  latitude: Yup.number().required('Latitude is required').min(-90).max(90),
  longitude: Yup.number().required('Longitude is required').min(-180).max(180),
});

type InitialValues = {
  name: string;
  latitude: string;
  longitude: string;
};

type Props = {
  onSubmit?: () => void;
};

const FormNewLocation = ({ onSubmit }: Props) => {
  const [modalOpened, modalHandlers] = useDisclosure(false);

  const { data: locations, mutate } = useLocations();

  const initialValues: InitialValues = {
    name: '',
    latitude: '',
    longitude: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={locationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          showNotification({
            id: 'new-location',
            title: `Creating Location: ${values.name}`,
            message: 'Please wait...',
            loading: true,
            autoClose: false,
            disallowClose: true,
          });

          const res = await axios.post<Location>('/api/locations', values, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          // Optimistically update the locations list
          const newLocations = locations
            ? [...locations, res.data]
            : [res.data];
          mutate(newLocations);

          // Update the notification
          updateNotification({
            id: 'new-location',
            title: `Created Location: ${res.data.name}`,
            message: 'Location created successfully',
            color: 'green',
          });
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const error = err as AxiosError;
            updateNotification({
              id: 'new-location',
              title: 'Error',
              message: error.response?.statusText,
              color: 'red',
            });
          } else {
            console.log(err);
            updateNotification({
              id: 'new-location',
              title: 'Error',
              message: 'Something went wrong',
              color: 'red',
            });
          }
        } finally {
          setSubmitting(false);
        }
        // Successfully Submitted
        onSubmit && onSubmit();
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
        <>
          <ModalSelectLocation
            opened={modalOpened}
            onClose={modalHandlers.close}
            onSelect={(value) => {
              setFieldValue('latitude', value.lat);
              setFieldValue('longitude', value.lng);
            }}
          />
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack spacing='xs'>
              <TextInput
                name='name'
                label='Name'
                description='Non-public name for your location'
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                disabled={isSubmitting}
                required
                autoComplete='off'
              />
              <Button
                onClick={modalHandlers.open}
                variant='default'
                leftIcon={<IconCurrentLocation size={16} />}
                disabled={isSubmitting}
              >
                Select Location
              </Button>
              <TextInput
                name='latitude'
                label='Latitude'
                description='Latitude of your location'
                placeholder='Latitude'
                value={values.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.latitude && errors.latitude}
                disabled={isSubmitting}
                required
              />
              <TextInput
                name='longitude'
                label='Longitude'
                description='Longitude of your location'
                placeholder='Longitude'
                value={values.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.longitude && errors.longitude}
                disabled={isSubmitting}
                required
              />
              <Button type='submit' loading={isSubmitting}>
                Submit
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Formik>
  );
};

export default FormNewLocation;
