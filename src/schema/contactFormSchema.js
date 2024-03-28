import * as yup from 'yup';

const contactFormSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: yup.string().matches(/^[0-9]+$/, "Phone must be only digits").required('Phone is required'),
    description: yup.string().required('Message is required'),
});

export default contactFormSchema;




