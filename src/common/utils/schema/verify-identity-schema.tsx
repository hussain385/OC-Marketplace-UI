import { InferType, mixed, object, string } from 'yup';

export const verifyIdentitySchema = object({
  uid: string().notRequired(),

  documentType: string().required('Document type is required.'),

  identificationNumber: string()
    .min(3, 'Must contain at least 3 character(s)')
    .max(20, 'Character(s) should be less then 20')
    .required('This field should not be empty.'),

  identificationName: string()
    .min(3, 'Must contain at least 3 character(s)')
    .max(255, 'Character(s) should be less then 255')
    .required('This field should not be empty.'),

  nationality: string().required('This field should not be empty.'),

  backMedia: mixed().when('documentType', {
    is: 'NATIONAL',
    then: (schema) =>
      schema.required().test('duplicate0', 'Every file should be unique.', (value, testContext) => {
        if (!(value instanceof File)) return true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (testContext.parent.selfieMedia?.name === value?.name) return false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return testContext.parent.mainMedia?.name !== value?.name;
      }),
    otherwise: (schema) => schema,
  }),

  // mainMedia: mixed()
  //   .required('This field should not be empty.')
  //   .test('mainMedia', 'This field should not be empty.', (value: any) => {
  //     return !isEmpty(value);
  //   })
  //   .test('duplicate1', 'Every file should be unique.', (value, testContext) => {
  //     if (isEmpty(value)) return false;
  //     if (testContext.parent.selfieMedia?.name === value?.name) return false;
  //     if (documentType === 'NATIONAL' && testContext.parent.backMedia?.name === value?.name) return false;
  //     return true;
  //   }),

  mainMedia: mixed()
    .required('This field should not be empty.')
    .test('duplicate1', 'Every file should be unique.', (value, testContext) => {
      if (!(value instanceof File)) return true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (testContext.parent.selfieMedia?.name === value?.name) return false;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return !(testContext.parent.backMedia?.name === value?.name);
    }),

  selfieMedia: mixed()
    .required('This field should not be empty.')
    .test('duplicate2', 'Every file should be unique.', (value, testContext) => {
      if (!(value instanceof File)) return true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (testContext.parent.mainMedia.name === value.name) return false;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return !(testContext.parent.backMedia?.name === value?.name);
    }),
});

export type VerifyIdentitySchema = InferType<typeof verifyIdentitySchema>;
