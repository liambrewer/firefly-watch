import { NumberInput, TextInput } from '@mantine/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

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

type Props = {};

const FormNewLocation = (props: Props) => {
  const initialValues: InitialValues = {
    name: '',
    latitude: '',
    longitude: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={locationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
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
      }) => (
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
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
          />
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
        </form>
      )}
    </Formik>
  );
};

export default FormNewLocation;
