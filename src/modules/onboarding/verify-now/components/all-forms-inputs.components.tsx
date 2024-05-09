import React from 'react';
import IdentificationOptionsComponent from '@/modules/onboarding/verify-now/components/identification-type-choose.component';
import NationalFormComponent from '@/modules/onboarding/verify-now/components/national-form.component';
import SelectLocationComponent from '@/modules/onboarding/verify-now/components/select-location.component';
import ImageLabelWithTooltipComponent from '@/common/components/image-label-with-tooltip.component';
import UploadForm from '@/common/components/forms/upload.form';
import { Box } from '@mui/material';
import FileUploadComponent from '@/common/components/forms/file-upload.component';
import { ICountrySelectInfo } from '@/common/interface/country-interface';

type componentPropType = {
  control: any;
  setValue: any;
  isSubmitting: boolean;
  setDocumentType: React.Dispatch<React.SetStateAction<string>>;
  documentType: string;
  selectedCountry: ICountrySelectInfo | undefined;
};

const AllFormsInputsComponents = ({
  control,
  setValue,
  isSubmitting,
  setDocumentType,
  documentType,
  selectedCountry,
}: componentPropType) => {
  return (
    <>
      <IdentificationOptionsComponent
        control={control}
        setValue={setValue}
        isSubmitting={isSubmitting}
        setDocumentType={setDocumentType}
      />
      <NationalFormComponent control={control} documentType={documentType} />
      <SelectLocationComponent control={control} mainSelectedCountry={selectedCountry} />
      <ImageLabelWithTooltipComponent
        tooltipText={'Must be JPEG, PNG format\n' + 'Maximum 5MB'}
        labelText={'Photo of National ID'}
      />
      <Box sx={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <UploadForm
          formSx={{ width: 'fit-content' }}
          isDisabled={isSubmitting}
          label={'Front page'}
          control={{ control, name: 'frontPic' }}
        />
        {documentType === 'NATIONAL' && (
          <UploadForm
            formSx={{ width: 'fit-content' }}
            isDisabled={isSubmitting}
            label={'Back page'}
            control={{ control, name: 'backPic' }}
          />
        )}
      </Box>
      <ImageLabelWithTooltipComponent tooltipText={'Must be JPEG, PNG format\n' + 'Maximum 5MB'} labelText={'Selfie with ID '} />
      <UploadForm
        isDisabled={isSubmitting}
        label={'Your full face photo while holding your ID'}
        control={{ control, name: 'selfie' }}
      />
      <div style={{ marginTop: '1em' }}>
        <ImageLabelWithTooltipComponent
          tooltipText={'Must be JPEG, PNG format\n' + 'Maximum 5MB'}
          labelText={'Proof of residential address'}
        />
        <FileUploadComponent
          control={{ control, name: 'addressProof' }}
          label={
            'Upload proof of residence like utility bill, bank statements, government-issued letters, or any other official documents'
          }
        />
      </div>
    </>
  );
};

export default AllFormsInputsComponents;
