import { InferType, mixed, object, string } from 'yup';

export const nonSingaporeSchema = object({
  data: object({
    uid: string().notRequired(),
    profile: object({
      type: string().default('BUSINESS.INTERNATIONAL').oneOf(['BUSINESS.LOCAL', 'BUSINESS.INTERNATIONAL']),
      detail: object({
        name: string().required('This field should not be empty.'),

        type: string().required('This field should not be empty.'),

        firstAddress: string()
          .required('This field should not be empty.')
          .min(1, 'Must contain at least 1 character(s)')
          .max(150, 'Character(s) should be less then 150'),

        registrationId: string()
          .required('This field should not be empty.')
          .min(1, 'Must contain at least 1 character(s)')
          .max(100, 'Character(s) should be less then 100'),

        secondAddress: string().notRequired().max(150, 'Character(s) should be less then 150'),

        location: object({
          country: string().required('This field should not be empty.'),
          state: string().notRequired(),
          city: string().notRequired(),

          postalCode: string()
            .required('This field should not be empty.')
            .matches(/^\d+$/, { message: 'Invalid format. Please use only numbers' })
            .min(3, 'Must contain at least 3 character(s)')
            .max(20, 'Character(s) should be less then 20'),
        }),
      }),
    }).required(),
    identity: object({
      type: string().required().oneOf(['NATIONAL', 'PASSPORT', 'NONE']),

      detail: object({
        officerName: string(),
        officerEmail: string(),
        nationality: string(),
        fullname: string(),
        code: string(),
        businessRole: string(),
      }).when('type', {
        is: 'NONE',
        then: () =>
          object({
            officerName: string().required('This field should not be empty.'),
            officerEmail: string().email('Not a valid email').required('This field should not be empty.'),
            // .test('email', 'You can not use your email here.', (value) => {
            //   return email !== value;
            // }),
          }),
        otherwise: () =>
          object({
            nationality: string().required('This field should not be empty.'),

            fullname: string()
              .required('This field should not be empty.')
              .min(3, 'Must contain at least 3 character(s)')
              .max(255, 'Character(s) should be less then 255'),

            code: string()
              .required('This field should not be empty.')
              .min(3, 'Must contain at least 3 character(s)')
              .max(20, 'Character(s) should be less then 20'),

            businessRole: string().required('This field should not be empty.'),
          }),
      }),
    }).required(),
  }).required(),
  certMedia: mixed().required('This field should not be empty.'),
  mainMedia: mixed().test('isRequired', 'This field should not be empty.', (value, context) => {
    if (context.parent.data.identity.type === 'NONE') {
      return true;
    }
    return !!value;
  }),
  backMedia: mixed().test('isRequired', 'This field should not be empty.', (value, context) => {
    if (context.parent.data.identity.type === 'NATIONAL') {
      return !!value;
    }
    return true;
  }),
  selfieMedia: mixed().test('isRequired', 'This field should not be empty.', (value, context) => {
    if (context.parent.data.identity.type === 'NONE') {
      return true;
    }
    return !!value;
  }),
});

export type nonSingaporeSchemaType = InferType<typeof nonSingaporeSchema>;
