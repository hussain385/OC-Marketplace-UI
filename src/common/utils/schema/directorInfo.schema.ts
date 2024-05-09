import { mixed, object, string } from 'yup';
import { isEmpty, isUndefined } from 'lodash';

export const directorInfoSchema = (documentType: string, UEN?: string) => {
  return object().shape(
    {
      documentType: string().required('Document type is required.'),

      identificationNumber: string().min(3, 'Must contain at least 3 character(s)').required('This field should not be empty.'),

      identificationName: string().min(3, 'Must contain at least 3 character(s)').required('This field should not be empty.'),

      companyName: string(),

      uen: string()
        .when(['companyName', 'uen'], {
          is: (uen: any) => isEmpty(uen) && !isUndefined(UEN),
          then: (rule) =>
            rule
              .test('verifyCompany', 'This field should not be empty.', (value) => {
                return !isEmpty(value);
              })
              .test(
                'verifyCompany1',
                "Click on check now and verify your company's details are accurate.",
                (value, testContext) => {
                  return !isEmpty(value) && !isEmpty(testContext.parent.companyName);
                },
              ),
        })
        .nullable(),

      backIDPic:
        documentType === 'NATIONAL'
          ? mixed()
              .required('This field should not be empty.')
              .test('backIDPic', 'This field should not be empty.', (value: any) => {
                return !isEmpty(value);
              })
              .test('duplicate0', 'Every file should be unique.', (value, testContext) => {
                if (isEmpty(value)) return false;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (testContext.parent.selfieVerification[0]?.name === value[0]?.name) return false;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return testContext.parent.frontIDPic[0]?.name !== value[0]?.name;
              })
          : mixed(),

      frontIDPic: mixed()
        .required('This field should not be empty.')
        .test('frontIDPic', 'This field should not be empty.', (value: any) => {
          return !isEmpty(value);
        })
        .test('duplicate1', 'Every file should be unique.', (value, testContext) => {
          if (isEmpty(value)) return false;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (testContext.parent.selfieVerification[0]?.name === value[0]?.name) return false;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return !(documentType === 'NATIONAL' && testContext.parent.backIDPic[0]?.name === value[0]?.name);
        }),

      selfieVerification: mixed()
        .required('This field should not be empty.')
        .test('selfieVerification', 'This field should not be empty.', (value: any) => {
          return !isEmpty(value);
        })
        .test('duplicate2', 'Every file should be unique.', (value, testContext) => {
          if (isEmpty(value)) return false;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (testContext.parent.frontIDPic[0]?.name === value[0]?.name) return false;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return !(documentType === 'NATIONAL' && testContext.parent.backIDPic[0]?.name === value[0]?.name);
        }),
    },
    [['uen', 'uen']],
  );
};
