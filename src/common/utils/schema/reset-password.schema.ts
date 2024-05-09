import * as yup from 'yup';
import { DIGIT_REGEX, UPPERCASE_REGEX, SPECIAL_CHARACTER_REGEX } from '../../constants';

export const changePassword = yup.object().shape(
  {
    newPassword: yup
      .string()
      .required('New password is a required field')
      .when(['newPassword'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('newPassword', 'At least one uppercase and lowercase', function (value) {
            const upperLower = UPPERCASE_REGEX;

            const isValid = upperLower.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['newPassword'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('password', 'At least number', function (value) {
            const digit = DIGIT_REGEX;

            const isValid = digit.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['newPassword'], {
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
      .when(['newPassword'], {
        is: (password: string) => password?.length > 0,
        then: (rule) => rule.min(8, 'At least 8 characters'),
        // rule.matches(/^((?=.*[a-z])(?=.*[A-Z]).{1,})$/, 'upperLower') ||
        // rule.matches(/[0-9]/, 'digit'),
      }),

    newPasswordConfirmation: yup
      .string()
      .required('isRequired')
      .test('newPasswordConfirmation', 'isMatch', function (value) {
        return this.parent.newPassword === value;
      })
      .when(['newPasswordConfirmation'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('newPasswordConfirmation', 'upperLower', function (value) {
            const upperLower = UPPERCASE_REGEX;

            const isValid = upperLower.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['newPasswordConfirmation'], {
        is: (password: string) => password?.length > 0,
        then: (rule) =>
          rule.test('newPasswordConfirmation', 'digit', function (value) {
            const digit = DIGIT_REGEX;

            const isValid = digit.test(value as string);

            if (!isValid) {
              return false;
            }
            return true;
          }),
      })
      .when(['newPasswordConfirmation'], {
        is: (password: string) => password?.length > 0,
        then: (rule) => rule.min(8, 'minHeight'),
        // rule.matches(/^((?=.*[a-z])(?=.*[A-Z]).{1,})$/, 'upperLower') ||
        // rule.matches(/[0-9]/, 'digit'),
      }),
  },
  [
    ['newPassword', 'newPassword'],
    ['newPasswordConfirmation', 'newPasswordConfirmation'],
  ],
);

export type ResetPasswordType = yup.InferType<typeof changePassword>;
