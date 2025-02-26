import * as Yup from 'yup';

export const updateValidationSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email('Invalid email').optional(),
  password: Yup.string().min(8, 'Password of minimum 8 characters').optional(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match',
  ),
});

export const passwordValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password of minimum 8 characters')
    .required('Password is required'),
});
