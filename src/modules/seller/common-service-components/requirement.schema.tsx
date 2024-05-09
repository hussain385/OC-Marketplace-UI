import { object, string } from 'yup';

export const RequirementSchema = () => {
  return object().shape({
    question: string().required('This field is required.').min(3, 'Must contain at least 3 character(s)'),
    type: string().required('This field is required.'),
  });
};
