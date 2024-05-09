import React from 'react';
// import IdentificationOptionsComponent from '@/modules/onboarding/verify-now/components/identification-type-choose.component';
import CompanyFormComponent from '@/modules/onboarding/verify-now/components/company-form.component';
import { FormLabel } from '@/common/styles';

import SelectLocationComponent from '@/modules/onboarding/verify-now/components/select-location.component';
import ImageLabelWithTooltipComponent from '@/common/components/image-label-with-tooltip.component';
// import UploadForm from '@/common/components/forms/upload.form';
import { Box } from '@mui/material';
import { ToggleButton } from '@/modules/onboarding/verify-now/components/company.style';
import FileUploadComponent from '@/common/components/forms/file-upload.component';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import InputForm from '@/common/components/forms/input.form';

type componentPropType = {
  control: any;
  setValue: any;
  legalRepresent: boolean;
  isSubmitting: boolean;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  documentType: string;
  selectedCountry: ICountrySelectInfo | undefined;
  onLegalRepresentChange: (value: boolean) => void; // Callback function to handle legalRepresent change
};

const AllFormsCompanyInputsComponents = ({
  control,
  documentType,
  selectedCountry,
  legalRepresent,
  onLegalRepresentChange,
}: componentPropType) => {
  const handleLegalRepresentChange = (value: boolean) => {
    onLegalRepresentChange(value); // Call the callback function with the updated value
  };

  return (
    <>
      <CompanyFormComponent control={control} documentType={documentType} />
      <div style={{ marginTop: '1em', marginBottom: '2em' }}>
        <ImageLabelWithTooltipComponent
          tooltipText={'Must be JPEG, PNG format\n' + 'Maximum 5MB'}
          labelText={'Registration Certificate'}
        />
        <FileUploadComponent
          control={{ control, name: 'certMedia' }}
          label={
            'If registration certificate is not available, upload document to show legal representatives/officers of business'
          }
        />
      </div>

      <InputForm
        label={'Operating address'}
        name={'operatingAddress'}
        control={control}
        inputProps={{
          placeholder: 'Operating address',
          sx: {
            height: '7rem',
            alignItems: 'start',
            padding: '2px 0px',
            border: '1px solid #EAEAEA',
            '&:hover': { outline: '1px solid black' },
            overflow: 'auto',
          },
          multiline: true,
        }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
          },
        }}
      />
      <SelectLocationComponent control={control} mainSelectedCountry={selectedCountry} />
      <Box>
        <FormLabel sx={{ marginBottom: '0.7em', fontSize: '14px !important' }}>
          Are you the legal representative of this company/organisation?
        </FormLabel>
        <ToggleButton
          onClick={() => handleLegalRepresentChange(true)}
          sx={{ width: '8em' }}
          className={legalRepresent ? 'active' : ''}
        >
          Yes, I am
        </ToggleButton>
        <ToggleButton
          onClick={() => handleLegalRepresentChange(false)}
          sx={{ ml: 1, width: '8em' }}
          className={legalRepresent ? '' : 'active'}
        >
          No, I&apos;m not
        </ToggleButton>
      </Box>
    </>
  );
};

export default AllFormsCompanyInputsComponents;
