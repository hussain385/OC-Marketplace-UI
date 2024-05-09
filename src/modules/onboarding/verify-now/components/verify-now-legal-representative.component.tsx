import React, { useEffect, useMemo, useState } from 'react';
import { Color } from '@/theme';
import { PrimaryButton, RoundContainer } from '@/common/styles';
import { Box, styled, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import AllFormsInputsComponents from '@/modules/onboarding/verify-now/components/all-forms-inputs.components';
import ReviewDetailsComponent from '@/modules/onboarding/verify-now/components/review-details.component';
import SubmitButton from '@/modules/onboarding/verify-now/components/submit-button.component';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import { useVerifyEntityByExistedMutation, useVerifyEntityInvitationMutation } from '@/redux/apis/marketplace';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from '@/router';
import { isEmpty } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyNowSchema } from '@/modules/onboarding/verify-now/components/verify-now-form.schema';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { useGetEntityListQuery } from '@/redux/apis/marketplace.ts';
import LegalRepresentativeApproval from '@/modules/onboarding/verify-now/components/legal-representative-approval.components';

const StepContainer = styled(Box)(() => ({
  width: '5em',
  height: '8px',
  borderRadius: '30px',
  backgroundColor: Color.line,
}));

const VerifyNowLegalRepresentativeComponent = ({
  setVerifyFormShow,
  selectedCountry,
}: {
  setVerifyFormShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry: ICountrySelectInfo | undefined;
}) => {
  const navigate = useNavigate();

  const { selectManageEntity, user } = useAppSelector((state) => state.mainState.useInfo);
  const [maxStep, setMaxStep] = useState(3);
  const [documentType, setDocumentType] = useState<string>('NATIONAL');
  const [step, setStep] = useState<number>(1);
  const [profileData, setProfileData] = useState<{ value: string; title: string }[]>([]);
  const [identityData, setIdentityData] = useState<{ value: string; title: string }[]>([]);
  const [imageUrl, setImageUrl] = useState<{ dataUrl: any }[]>([]);
  const [documentName, setDocumentName] = useState<string>('');
  const [verifyEntityInvitation, { isLoading }] = useVerifyEntityInvitationMutation();
  const [verifyEntityByExisted] = useVerifyEntityByExistedMutation();
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

  const { data: entities } = useGetEntityListQuery(
    {
      params: { filter: `uid||$in||${user?.roles.map((r) => r.entityId).join(',')}`, populate: [{ path: '__logo' }] },
    },
    { skip: !user?.roles || isEmpty(user?.roles) },
  );

  const filteredEntities = useMemo(
    () => entities?.filter((e) => e.profile.type.includes(companyProfiles.freelancer)),
    [entities],
  );

  useEffect(() => {
    if (
      filteredEntities &&
      filteredEntities.length > 0 &&
      (filteredEntities[0].status === 'VERIFIED' || filteredEntities[0].status === 'PENDING')
    ) {
      setMaxStep(2);
    } else {
      setMaxStep(3);
    }
    const reviewData = [
      { title: 'Company name', value: selectManageEntity?.profile.detail.name || '' },
      { title: 'Business Type', value: selectManageEntity?.profile.detail.type || '' },
      { title: 'Operating address', value: selectManageEntity?.profile.detail.address || '' },
      { title: 'Operating Country', value: selectManageEntity?.profile.detail.country || '' },
      { title: 'Operating State/Province', value: selectManageEntity?.profile.detail.state || '' },
      { title: 'Operating City', value: selectManageEntity?.profile.detail.city || '' },
      { title: 'Operating Postal code', value: selectManageEntity?.profile.detail.postalCode || '' },
    ];

    const reviewSecondData = [
      { title: 'Representative name', value: selectManageEntity?.identity?.detail?.ownerName || '' },
      { title: 'Representative email', value: selectManageEntity?.identity?.detail?.ownerEmail || '' },
    ];

    setProfileData(reviewData);
    setIdentityData(reviewSecondData);
    setDocumentName(selectManageEntity?.profile.detail.certMediaId || '');
  }, [selectManageEntity]);

  const onSubmitHandle = async (data?: any) => {
    if (step === 1) {
      setStep(step + 1);
    }
    if (step === 2) {
      if (
        filteredEntities &&
        filteredEntities.length > 0 &&
        (filteredEntities[0].status === 'VERIFIED' || filteredEntities[0].status === 'PENDING')
      ) {
        const tempEntity: any = await verifyEntityByExisted({
          id: selectManageEntity?.uid ?? '',
        });

        if (tempEntity.data.success) {
          navigate('/setup-organisation/verification-inprogress');
        }
      } else {
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
    }
    if (step === 3) {
      const formData = new FormData();
      const dataSubmit = {
        identity: {
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
        },
      };

      if (getValues('frontPic')) {
        formData.append('mainMedia', getValues('frontPic'));
      }
      if (getValues('backPic')) {
        formData.append('backMedia', getValues('backPic'));
      }
      if (getValues('selfie')) {
        formData.append('selfieMedia', getValues('selfie'));
      }
      if (getValues('addressProof')) {
        formData.append('proofOfResidenceMedias', getValues('addressProof'));
      }
      formData.append('data', JSON.stringify(dataSubmit));
      const tempEntity: any = await verifyEntityInvitation({
        body: formData,
        id: selectManageEntity?.uid ?? '',
      }).unwrap();

      if (tempEntity.data) {
        navigate('/setup-organisation/success');
      }
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
        <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Review Details</Typography>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Render Steps based on maxStep */}
          {[...Array(maxStep)].map((_, index) => (
            <StepContainer key={index} sx={{ background: step >= index + 1 ? Color.priBlue : Color.line }} />
          ))}

          {/* Render the step count */}
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>{`${step}/${maxStep}`}</Typography>
        </Box>
      </Box>

      {(() => {
        switch (step) {
          case 1:
            return (
              <>
                <ReviewDetailsComponent
                  documentName={documentName}
                  documents={documentName}
                  profileData={profileData}
                  notlegalRep
                  isCompany
                  noAgreement
                  identityData={identityData}
                  imageUrl={imageUrl}
                />

                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: '3em' }}>
                  <PrimaryButton disabled={isLoading} onClick={() => setStep(step + 1)} sx={{ marginLeft: 2 }}>
                    {isLoading ? 'Please wait!' : 'Next'}
                  </PrimaryButton>
                </Box>
              </>
            );
          case 2:
            if (
              filteredEntities &&
              filteredEntities.length > 0 &&
              (filteredEntities[0].status === 'VERIFIED' || filteredEntities[0].status === 'PENDING')
            ) {
              return (
                <>
                  <LegalRepresentativeApproval />
                  <SubmitButton isLoading={isLoading} setStep={setStep} onOk={onSubmitHandle} step={step} />
                </>
              );
            } else {
              return (
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
              );
            }
          case 3:
            return (
              <>
                <ReviewDetailsComponent
                  documentName={documentName}
                  documents={documentName}
                  profileData={profileData}
                  isCompany
                  identityData={identityData}
                  imageUrl={imageUrl}
                />

                <SubmitButton isLoading={isLoading} setStep={setStep} onOk={onSubmitHandle} step={step} />
              </>
            );
          default:
            return null;
        }
      })()}
    </RoundContainer>
  );
};

export default VerifyNowLegalRepresentativeComponent;
