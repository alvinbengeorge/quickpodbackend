import yup, { string } from 'yup';

const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const registerSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    creator: yup.boolean()

});

const addPodcastSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(). required("Description is required"),
    creator: yup.string().required("Creator ID is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

export const validateLogin = async (req) => {
    await loginSchema.validate(req.body);
};

export const validateRegister = async (req) => {
    await registerSchema.validate(req.body);
};

export const validateAddPodcast = async (req) => {
    await addPodcastSchema(req.body);
}