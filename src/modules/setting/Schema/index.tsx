import { InferType, number, object, ref, string } from 'yup';

export const fullNameSchema = object({
  name: string()
    .min(3, 'Must contain at least 3 character(s)')
    .max(255, 'Character(s) should be less then 255')
    .test('input', 'The field should have character only', (value) => {
      return /^[A-Za-z ]+$/.test(value as string);
    })
    .required(),
});

export type fullNameSchemaType = InferType<typeof fullNameSchema>;

export const mobileSchema = object({
  contactMobile: number().typeError('Invalid format. Please use only numbers').required('Mobile number is required'),
  contactMobileCountryCode: string().required('This filed can not be empty'),
});

export type mobileSchemaType = InferType<typeof mobileSchema>;

export const passwordSchema = object({
  currentPassword: string().required('Current password is required').min(8, 'must contain 8 characters in length'),
  newPassword: string()
    .min(8, 'must contain 8 characters in length')
    .matches(/^(?=.*[a-z])/, 'At least one lower case letter is required')
    .matches(/^(?=.*[A-Z])/, 'At least one upper case letter is required')
    .matches(/^(?=.*[0-9])/, 'At least one number is required')
    .required('New password is required'),
  newPasswordConfirmation: string()
    .oneOf([ref('newPassword')], 'Confirm password must match')
    .required('Confirmation password is required'),
});

export type passwordSchemaType = InferType<typeof passwordSchema>;
