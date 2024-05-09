import React, { useState } from 'react';
import { Color } from '@/theme';
import { PrimaryButton, RoundContainer } from '@/common/styles';
import { Box, styled, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import AllFormsCompanyInputsComponents from '@/modules/onboarding/verify-now/components/all-company-forms-inputs.components';
import AllFormsInputsComponents from '@/modules/onboarding/verify-now/components/all-forms-inputs.components';
import AllLegalFormsInputsComponents from '@/modules/onboarding/verify-now/components/all-legal-forms-inputs.components';
import SubmitButton from '@/modules/onboarding/verify-now/components/submit-button.component';

import ReviewDetailsComponent from '@/modules/onboarding/verify-now/components/review-details.component';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import { useVerifyEntityMutation } from '@/redux/apis/marketplace';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from '@/router';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  verifyNowSchema,
  verifyNowCompanySchema,
  verifyLegalSchema,
} from '@/modules/onboarding/verify-now/components/verify-now-form.schema';
import { isEmpty } from 'lodash';

const StepContainer = styled(Box)(() => ({
  width: '5em',
  height: '8px',
  borderRadius: '30px',
  backgroundColor: Color.line,
}));

const VerifyNowCompanyFormComponent = ({
  setVerifyFormShow,
  selectedCountry,
}: {
  setVerifyFormShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry: ICountrySelectInfo | undefined;
}) => {
  const navigate = useNavigate();
  const { selectManageEntity } = useAppSelector((state) => state.mainState.useInfo);
  const [documentType, setDocumentType] = useState<string>('NATIONAL');
  const [legalRepresent, setLegalRepresent] = useState(true);
  const [step, setStep] = useState<number>(1);
  const [profileData, setProfileData] = useState<{ value: string; title: string }[]>([]);
  const [identityData, setIdentityData] = useState<{ value: string; title: string }[]>([]);
  const [imageUrl, setImageUrl] = useState<{ dataUrl: any }[]>([]);
  const [documentName, setDocumentName] = useState<string>('');
  const [documents, setDocuments] = useState<string>('');
  const [verifyEntity, { isLoading }] = useVerifyEntityMutation();

  const {
    control: orgControl,
    handleSubmit: orgSubmit,
    setValue: orgValue,
    getValues: orgGetValues,
    formState: { isSubmitting: isOrgSubmitting },
  } = useForm<any>({
    resolver: yupResolver(verifyNowCompanySchema()),
    defaultValues: {
      companyName: '',
      businessType: '',
      registrationId: '',
      operatingAddress: '',
      country: selectedCountry ? selectedCountry.name : 'Singapore',
      state: '',
      city: '',
      postalCode: '',
    },
  });

  const {
    control: legalControl,
    getValues: legalGetValues,
    handleSubmit: legalSubmit,
  } = useForm<any>({
    resolver: yupResolver(verifyLegalSchema()),
    defaultValues: {
      companyName: '',
      businessType: '',
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(verifyNowSchema(documentType)),
    defaultValues: {
      identificationType: 'NATIONAL',
      nationality: '',
      nationalityNumber: '',
      streetAddress: '',
      name: '',
      country: selectedCountry ? selectedCountry.name : 'Singapore',
      state: '',
      city: '',
      postalCode: '',
    },
  });

  const onSubmitHandle = async (data: any) => {
    if (step === 1) {
      const reviewData = [
        { title: 'Company name', value: data.companyName },
        { title: 'Business Type', value: data.businessType },
        { title: 'Operating address', value: data.operatingAddress },
        { title: 'Operating Country', value: data.country },
        { title: 'Operating State/Province', value: data.state },
        { title: 'Operating City', value: data.city },
        { title: 'Operating Postal code', value: data.postalCode },
      ];
      data.operatingCountry = data.country;
      data.operatingState = data.state;
      data.operatingCity = data.city;
      data.operatingPostalCode = data.postalCode;
      setDocuments(data.certMedia.name);
      setProfileData(reviewData);
      setStep(step + 1);
    }

    if (step === 2 && legalRepresent) {
      const reviewData = [
        { title: 'Full name', value: data.name },
        { title: 'Nationality', value: data.nationality },
        { title: 'ID number', value: data.nationalityNumber },
        { title: 'Street address', value: data.streetAddress },
        { title: 'Country', value: data.country },
        { title: 'State/Province', value: data.state },
        { title: 'City', value: data.nationalityNumber },
        { title: 'Postal code', value: data.postalCode },
      ];

      setDocumentName(data.addressProof.name);
      const reviewUrl = [{ dataUrl: data.frontPic }, { dataUrl: data.selfie }];
      if (documentType === 'NATIONAL') {
        reviewUrl.push({ dataUrl: data.backPic });
      }
      setIdentityData(reviewData);
      setImageUrl(reviewUrl);

      setStep(step + 1);
    }
    if (step === 2 && !legalRepresent) {
      const reviewData = [
        { title: 'Representative name', value: data.legalName },
        { title: 'Representative email', value: data.legalEmail },
      ];
      setIdentityData(reviewData);
      setStep(step + 1);
    }

    if (step === 3) {
      const formData = new FormData();
      const dataSubmit = {
        profile: {
          type: selectManageEntity?.profile.type,
          'detail.name': orgGetValues('companyName'),
          'detail.type': data.businessType,
          'detail.registrationId': data.registrationId,
          'detail.address': data.operatingAddress,
          'detail.country': data.operatingCountry,
          'detail.state': isEmpty(data.operatingState) ? undefined : data.operatingState,
          'detail.city': isEmpty(data.operatingCity) ? undefined : data.operatingCity,
          'detail.postalCode': data.operatingPostalCode,
          certMedia: data.certMedia,
        },
        identity: legalRepresent
          ? {
              type: getValues('identificationType'),
              'detail.fullname': getValues('name'),
              'detail.code': getValues('nationalityNumber'),
              'detail.nationality': getValues('nationality'),
              'detail.address': getValues('streetAddress'),
              'detail.country': getValues('country'),
              'detail.state': getValues('state'),
              'detail.city': getValues('city'),
              'detail.postalCode': getValues('postalCode'),
              mainMedia: getValues('frontPic'),
              backMedia: getValues('backPic'),
              selfieMedia: getValues('selfie'),
              proofOfResidenceMedias: getValues('addressProof'),
            }
          : {
              type: 'NONE',
              'detail.officerName': legalGetValues('legalName'),
              'detail.officerEmail': legalGetValues('legalEmail'),
            },
      };
      if (data.certMedia) {
        formData.append('certMedia', data.certMedia);
      }
      if (dataSubmit.identity.mainMedia) {
        formData.append('mainMedia', getValues('frontPic'));
      }
      if (dataSubmit.identity.backMedia) {
        formData.append('backMedia', getValues('backPic'));
      }
      if (dataSubmit.identity.selfieMedia) {
        formData.append('selfieMedia', getValues('selfie'));
      }
      if (dataSubmit.identity.proofOfResidenceMedias) {
        formData.append('proofOfResidenceMedias', getValues('addressProof'));
      }

      formData.append('data', JSON.stringify(dataSubmit));
      const tempEntity: any = await verifyEntity({
        body: formData,
        id: selectManageEntity?.uid ?? '',
      });

      if (tempEntity.data) {
        navigate('/setup-organisation/verification-inprogress');
      }
    }
  };

  const Title = () => {
    switch (step) {
      case 1:
        return 'Provide your organisation details';
      case 2:
        if (legalRepresent) {
          return 'Provide Your Identity Details';
        } else {
          return 'Request Legal Representative’s Approval';
        }
      case 3:
        return 'Review Details';
      default:
        break;
    }
  };

  return (
    <RoundContainer
      sx={{
        boxShadow: 'none',
        border: `1px solid ${Color.line}`,
        padding: '50px',
        width: { xs: '100%', md: '70%' },
        marginBottom: '10em',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>{Title()}</Typography>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <StepContainer sx={{ background: Color.priBlue }} />
          <StepContainer sx={{ background: step >= 2 ? Color.priBlue : Color.line }} />
          <StepContainer sx={{ background: step === 3 ? Color.priBlue : Color.line }} />
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{`${step}/3`}</Typography>
        </Box>
      </Box>

      {step === 1 && (
        <form onSubmit={orgSubmit(onSubmitHandle)}>
          <AllFormsCompanyInputsComponents
            control={orgControl}
            selectedCountry={selectedCountry}
            setDocumentType={setDocumentType}
            documentType={documentType}
            legalRepresent={legalRepresent}
            isSubmitting={isOrgSubmitting}
            setValue={orgValue}
            onLegalRepresentChange={setLegalRepresent}
          />
          <SubmitButton isLoading={isLoading} setStep={setStep} step={step} />
        </form>
      )}

      {step === 2 && legalRepresent && (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
          <AllFormsInputsComponents
            control={control}
            selectedCountry={selectedCountry}
            setDocumentType={setDocumentType}
            documentType={documentType}
            isSubmitting={isSubmitting}
            setValue={setValue}
          />

          <SubmitButton isLoading={isLoading} setStep={setStep} step={step} />
        </form>
      )}
      {step === 2 && !legalRepresent && (
        <form onSubmit={legalSubmit(onSubmitHandle)}>
          <AllLegalFormsInputsComponents control={legalControl} />
          <SubmitButton isLoading={isLoading} setStep={setStep} step={step} />
        </form>
      )}

      {step === 3 && (
        <>
          <form onSubmit={orgSubmit(onSubmitHandle)}>
            <ReviewDetailsComponent
              documentName={documentName}
              documents={documents}
              profileData={profileData}
              identityData={identityData}
              imageUrl={imageUrl}
              isCompany={true}
              notlegalRep={!legalRepresent}
            />
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: '3em' }}>
              <PrimaryButton disabled={isLoading} type='submit' sx={{ marginLeft: 2 }}>
                {isLoading ? 'Please wait!' : 'Next'}
              </PrimaryButton>
            </Box>
          </form>
        </>
      )}
    </RoundContainer>
  );
};

export default VerifyNowCompanyFormComponent;
