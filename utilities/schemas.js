import yup from 'yup';

const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    creator: yup.boolean().required('Creator is required'),
});

export const validateLogin = async (req) => {
    await loginSchema.validate(req.body);
};

export const validateRegister = async (req) => {
    await registerSchema.validate(req.body);
};