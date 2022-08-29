import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCurrentLocation } from '@tabler/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ModalSelectLocation from '../../modals/select-location';

const locationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
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

  const initialValues: InitialValues = {
    name: '',
    latitude: '',
    longitude: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={locationSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
