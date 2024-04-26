import * as yup from 'yup';

export const contactUsSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters long'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  phone: yup.string()
    .required('Phone is required')
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, 'Phone number must be at least 10 digits long')
    .max(15, 'Phone number must be less than 15 digits long'),
    description: yup.string().required('Message is required')
});

export default contactUsSchema;
