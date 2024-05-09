import { string, object, ref } from 'yup';

export const nameSchema = object({
  name: string()
    .required('The field should not be empty.')
    .test('input', 'The field should have character only', (value) => {
      return /^[A-Za-z ]+$/.test(value as string);
    }),
});

export const confirmPasswordSchema = object().shape(
  {
    password: string()
      .notRequired()
      .when(['password'], {
        is: (value: any) => value?.length > 0,
        then: (rule) =>
          rule.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){8,}/, 'Password should contain uppercase, lowercase and number'),
        //then: (rule) => rule.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, 'Password should contain aplha numeric'),
      })
      .min(8),
    confirmpwd: string()
      .oneOf([ref('password')], 'Confirm password must match')
      .required('Confirm password is required'),
    currentpwd: string().required('Current password is required'),
  },
  [['password', 'password']],
);

export const emailSchema = object().shape(
  {
    email: string().required('Email is required').email('The email you entered is invalid.'),
  },
  [['email', 'email']],
);
