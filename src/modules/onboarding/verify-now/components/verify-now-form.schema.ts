import { mixed, object, string } from 'yup';
import { isEmpty } from 'lodash';

export const verifyNowSchema = (documentType: string) => {
  return object().shape({
    identificationType: string().required('Document type is required.'),
    nationality: string().required('Document type is required.').min(3, 'Must contain at least 3 character(s)'),
    streetAddress: string().required('Document type is required.').min(3, 'Must contain at least 3 character(s)'),
    nationalityNumber: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    name: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    country: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    state: string(),
    city: string(),
    postalCode: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),

    backPic:
      documentType === 'NATIONAL'
        ? mixed()
            .required('This field should not be empty.')
            .test('backPic', 'This field should not be empty.', (value: any) => {
              return !isEmpty([value]);
            })
            .test('duplicate0', 'Every file should be unique.', (value, testContext) => {
              if (isEmpty([value])) return false;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              if ((value as any) instanceof File && testContext.parent.selfie?.name === (value as any)?.name) return false;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              return !((value as any) instanceof File && testContext.parent.frontPic?.name === (value as any)?.name);
            })
        : mixed(),

    frontPic: mixed()
      .required('This field should not be empty.')
      .test('frontPic', 'This field should not be empty.', (value: any) => {
        return !isEmpty([value]);
      })
      .test('duplicate1', 'Every file should be unique.', (value, testContext) => {
        if (isEmpty([value])) return false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        if ((value as any) instanceof File && testContext.parent.selfie?.name === (value as any)?.name) return false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        return !(
          (value as any) instanceof File &&
          documentType === 'NATIONAL' &&
          testContext.parent.backPic?.name === (value as any)?.name
        );
      }),

    selfie: mixed()
      .required('This field should not be empty.')
      .test('selfie', 'This field should not be empty.', (value: any) => {
        return !isEmpty([value]);
      })
      .test('duplicate2', 'Every file should be unique.', (value, testContext) => {
        if (isEmpty([value])) return false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        if ((value as any) instanceof File && testContext.parent.frontPic?.name === (value as any)?.name) return false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        return !(
          (value as any) instanceof File &&
          documentType === 'NATIONAL' &&
          testContext.parent.backPic?.name === (value as any)?.name
        );
      }),

    addressProof: mixed()
      .required('This field should not be empty.')
      .test('selfie', 'This field should not be empty.', (value: any) => {
        return !isEmpty([value]);
      }),
  });
};

export const verifyNowCompanySchema = () => {
  return object().shape({
    businessType: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    operatingAddress: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    companyName: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    country: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    state: string(),
    city: string(),
    registrationId: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    postalCode: string().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
    certMedia: mixed()
      .required('This field should not be empty.')
      .test('certificate', 'This field should not be empty.', (value: any) => {
        return !isEmpty([value]);
      }),
  });
};

export const verifyLegalSchema = () => {
  return object().shape({
    legalName: string().required('This field should not be empty').min(3, 'Must contain at least 3 character(s)'),
    legalEmail: string().email().required('This field should not be empty.').min(3, 'Must contain at least 3 character(s)'),
  });
};
