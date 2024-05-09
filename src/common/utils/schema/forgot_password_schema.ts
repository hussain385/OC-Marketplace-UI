import * as yup from 'yup';
import { EMAILREGEX } from '../../constants/index';

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required('isRequired').matches(EMAILREGEX, 'The email you entered is invalid.'),
});

export type ForgotPasswordSchema = yup.InferType<typeof forgotPasswordSchema>;
