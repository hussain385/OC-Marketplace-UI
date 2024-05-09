import * as yup from 'yup';
import { DIGIT_REGEX, EMAILREGEX, LETTER_REGEX } from '../../constants/index';

export const loginSchema = yup.object().shape(
  {
    email: yup.string().required('Email should not be empty').email('The email you entered is invalid.'),
    emailphone: yup
      .string()
      // .email("Enter a valid email")
      .when(['emailphone'], {
        is: (emailphone: string) => emailphone?.length > 1,
        then: (rule) =>
          rule.test('emailphone', 'The email you entered is invalid.', function (value) {
            const emailRegex = EMAILREGEX;

            const isValidEmail = emailRegex.test(value as string);
            const phoneregex = DIGIT_REGEX;
            const letter = LETTER_REGEX;

            const isValidPhone = phoneregex.test(value as string);

            const isValidLetter = letter.test(value as string);

            if (isValidEmail && isValidLetter) {
              return true;
            }
            return isValidPhone && !isValidLetter;
          }),
      })
      .when(['emailphone'], {
        is: (emailphone: number) => emailphone !== null && emailphone !== undefined && !isNaN(emailphone),
        then: (rule) =>
          rule.test('emailphone', 'The phone number you entered is invalid.', function (value) {
            const emailRegex = EMAILREGEX;

            const isValidEmail = emailRegex.test(value as string);
            const phoneregex = DIGIT_REGEX;
            const letter = LETTER_REGEX;

            const isValidPhone = phoneregex.test(value as string);

            const isValidLetter = letter.test(value as string);

            const isStringValue = value as string;

            if (isValidEmail && isValidLetter) {
              return true;
            }
            return isValidPhone && !isValidLetter && isStringValue.length >= 4;
          }),
      }),
    password: yup.string().min(1, 'password must contain 8 characters').required('Password is required'),
  },
  [
    ['emailphone', 'emailphone'],
    ['password', 'password'],
    ['email', 'email'],
  ],
);

export type LoginSchemaType = yup.InferType<typeof loginSchema>;

// rule.min(8, 'minHeight') ||
// 				rule.matches(/^((?=.*[a-z])(?=.*[A-Z]).{1,})$/, 'upperLower') ||
// 				rule.matches(/[0-9]/, 'digit'),
