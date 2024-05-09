import React from 'react';
import LegalFormComponent from '@/modules/onboarding/verify-now/components/legal-form.components';
import { Typography } from '@mui/material';

type componentPropType = {
  control: any;
};

const AllLegalFormsInputsComponents = ({ control }: componentPropType) => {
  return (
    <>
      <Typography sx={{ marginBottom: '2em', lineHeight: '1.5', fontSize: '15px' }}>
        We’ll email a request to the legal representative identified here to approve the creation of this business account. Once
        approved, the verification process will begin.
      </Typography>
      <LegalFormComponent control={control} />
    </>
  );
};

export default AllLegalFormsInputsComponents;
