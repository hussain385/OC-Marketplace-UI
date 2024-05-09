import { object, string } from 'yup';

export const sgNonAuthCompanySchema = (email: string) => {
  return object().shape({
    identificationName: string().min(3, 'Must contain at least 3 character(s)').required('This field should not be empty.'),

    email: string()
      .required('This field should not be empty.')
      .email('Not a valid format')
      .test('email', 'You can not use your email here.', (value) => {
        return email !== value;
      }),
  });
};
