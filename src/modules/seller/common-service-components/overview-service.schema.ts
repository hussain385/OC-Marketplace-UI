import { mixed, object, string } from 'yup';
import { isEmpty } from 'lodash';

export const ServicesSchema = (imageLoop: { id: number; image: string; name: string }[]) => {
  return object().shape({
    subCategory: string().required('This field is required.'),
    category: string().required('This field is required.'),
    description: string().required('This field is required.'),
    name: string().min(3, 'Must contain at least 3 character(s)').required('This field is required.'),
    servicePic1: isEmpty(imageLoop[0]?.image)
      ? mixed()
          .required('This field should not be empty.')
          .test('servicePic1', 'This field should not be empty.', (value: any) => {
            return !isEmpty(value);
          })
      : mixed(),
    supporterId: string().required('This field is required.'),
    // servicePic2: mixed()
    //   .required('This field should not be empty.')
    //   .test('servicePic2', 'This field should not be empty.', (value: any) => {
    //     return !isEmpty(value);
    //   }),
    // servicePic3: mixed()
    //   .required('This field should not be empty.')
    //   .test('servicePic3', 'This field should not be empty.', (value: any) => {
    //     return !isEmpty(value);
    //   })
  });
};
