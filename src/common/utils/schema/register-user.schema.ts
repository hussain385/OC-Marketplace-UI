import * as yup from 'yup';

import { CHAR_ONLY_REGEX, DIGIT_REGEX, LOWERCASE_REGEX, SPECIAL_CHARACTER_REGEX, UPPERCASE_REGEX } from '../../constants/index';

export const registerSchema = yup.object().shape(
  {
    email: yup.string().required('isRequired').email('The email you entered is invalid.'),
    username: yup
      .string()
      .required('isRequired')
      .when(['username'], {
        is: (email: string) => email?.length > 1,
        then: (rule) =>
          rule.test('username', 'The name you entered is invalid.', (value) => !yup.string().email().isValidSync(value)),
      })
      .matches(CHAR_ONLY_REGEX, 'The name you entered is invalid.')
      .min(2, 'The name you entered is invalid.')
      .max(255, 'The name you entered is invalid.'),
    password: yup
      .string()
      .required('Password must contain 8 characters')
      .when(['password'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('password', 'At least 1 uppercase character', function (value) {
            const isValid = UPPERCASE_REGEX.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['password'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('password', 'At least 1 lowercase charater', function (value) {
            const isValid = LOWERCASE_REGEX.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['password'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('password', 'At least number', function (value) {
            const isValid = DIGIT_REGEX.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['password'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('password', 'At least 1 symbol', function (value) {
            const isValid = SPECIAL_CHARACTER_REGEX.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['password'], {
        is: (password: string) => password?.length > 0,
        then: (rule) => rule.min(8, 'At least 8 characters'),
      }),
  },
  [
    ['email', 'email'],
    ['username', 'username'],
    ['password', 'password'],
  ],
);

export type RegisterSchemaType = yup.InferType<typeof registerSchema>;
