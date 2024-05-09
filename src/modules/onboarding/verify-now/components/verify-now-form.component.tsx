import React, { useState, useEffect } from 'react';
import { Color } from '@/theme';
import { PrimaryButton, RoundContainer, SecondryButton } from '@/common/styles';
import { Box, styled, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import AllFormsInputsComponents from '@/modules/onboarding/verify-now/components/all-forms-inputs.components';
import ReviewDetailsComponent from '@/modules/onboarding/verify-now/components/review-details.component';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import { useVerifyEntityMutation } from '@/redux/apis/marketplace';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from '@/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { verifyNowSchema } from '@/modules/onboarding/verify-now/components/verify-now-form.schema';
import { mediaUrlGenerator } from '@/common/utils';
import { isEmpty } from 'lodash';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';

const StepContainer = styled(Box)(() => ({
  width: '5em',
  height: '8px',
  borderRadius: '30px',
  backgroundColor: Color.line,
}));

const VerifyNowFormComponent = ({
  setVerifyFormShow,
  selectedCountry,
}: {
  setVerifyFormShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry: ICountrySelectInfo | undefined;
}) => {
  const navigate = useNavigate();
  const { user } = usePayloadUseInfo();
  const { selectManageEntity } = useAppSelector((state) => state.mainState.useInfo);
  const [documentType, setDocumentType] = useState<string>('NATIONAL');
  const [step, setStep] = useState<number>(1);
  const [identityData, setIdentityData] = useState<{ value: string; title: string }[]>([]);
  const [imageUrl, setImageUrl] = useState<{ dataUrl: any }[]>([]);
  const [documentName, setDocumentName] = useState<string>('');
  const [verifyEntity, { isLoading }] = useVerifyEntityMutation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(verifyNowSchema(documentType)),
    defaultValues: {
      identificationType: selectManageEntity
        ? selectManageEntity.identity
          ? selectManageEntity.identity.type
          : 'NATIONAL'
        : 'NATIONAL',
      nationality: selectManageEntity
        ? selectManageEntity.identity
          ? selectManageEntity.identity?.detail?.nationality
          : ''
        : '',
      nationalityNumber: selectManageEntity ? (selectManageEntity.identity ? selectManageEntity.identity?.detail?.code : '') : '',
      streetAddress: selectManageEntity ? (selectManageEntity.identity ? selectManageEntity.identity?.detail?.address : '') : '',
      name: selectManageEntity ? (selectManageEntity.identity ? selectManageEntity.identity?.detail?.fullname : '') : '',
      country: selectManageEntity
        ? selectManageEntity.identity
          ? selectManageEntity.identity?.detail?.country
          : selectedCountry
            ? selectedCountry.name
            : 'Singapore'
        : 'Singapore',
      state: selectManageEntity ? (selectManageEntity.identity ? selectManageEntity.identity?.detail?.state : '') : '',
      city: selectManageEntity ? (selectManageEntity.identity ? selectManageEntity.identity?.detail?.city : '') : '',
      postalCode: selectManageEntity ? (selectManageEntity.identity ? selectManageEntity.identity?.detail?.postalCode : '') : '',
      frontPic: selectManageEntity
        ? selectManageEntity.__mainIdentityMedia
          ? mediaUrlGenerator(selectManageEntity.__mainIdentityMedia)
          : undefined
        : undefined,
      backPic: selectManageEntity
        ? selectManageEntity.__backIdentityMedia
          ? mediaUrlGenerator(selectManageEntity.__backIdentityMedia)
          : undefined
        : undefined,
      selfie: selectManageEntity
        ? selectManageEntity.__selfieIdentityMedia
          ? mediaUrlGenerator(selectManageEntity.__selfieIdentityMedia)
          : undefined
        : undefined,
      addressProof: selectManageEntity
        ? selectManageEntity.__proofOfResidenceMedias
          ? mediaUrlGenerator(selectManageEntity.__proofOfResidenceMedias[0])
          : undefined
        : undefined,
    },
  });

  useEffect(() => {
    if (selectManageEntity && selectManageEntity.__proofOfResidenceMedias) {
      const { originalname } = selectManageEntity.__proofOfResidenceMedias[0];
      setDocumentName(originalname);
    }
  }, [selectManageEntity]);

  const onSubmitHandle = async (data: any) => {
    if (step === 1) {
      const reviewData = [
        { title: 'Full name', value: data.name },
        { title: 'Nationality', value: data.nationality },
        { title: 'ID number', value: data.nationalityNumber },
        { title: 'Street address', value: data.streetAddress },
        { title: 'Country', value: data.country },
        { title: 'State/Province', value: isEmpty(data.state) ? '--' : data.state },
        { title: 'City', value: isEmpty(data.city) ? '--' : data.city },
        { title: 'Postal code', value: data.postalCode },
      ];
      if (data.addressProof && (data.addressProof as any) instanceof File) {
        setDocumentName(data.addressProof.name);
      }

      const reviewUrl = [
        { dataUrl: (data.frontPic as any) instanceof File ? URL.createObjectURL(data.frontPic) : data.frontPic },
        { dataUrl: (data.selfie as any) instanceof File ? URL.createObjectURL(data.selfie) : data.selfie },
      ];
      if (documentType === 'NATIONAL') {
        reviewUrl.push({ dataUrl: (data.backPic as any) instanceof File ? URL.createObjectURL(data.backPic) : data.backPic });
      }
      setIdentityData(reviewData);
      setImageUrl(reviewUrl);
      setStep(step + 1);
    } else {
      const formData = new FormData();
      const dataSubmit = {
        profile: {
          type: selectManageEntity?.profile.type,
          'detail.address': data.streetAddress,
          'detail.country': data.country,
          'detail.state': isEmpty(data.state) ? undefined : data.state,
          'detail.city': isEmpty(data.city) ? undefined : data.city,
          'detail.postalCode': data.postalCode,
        },
        identity: {
          type: data.identificationType,
          'detail.fullname': data.name,
          'detail.code': data.nationalityNumber,
          'detail.nationality': data.nationality,
          'detail.address': data.streetAddress,
          'detail.country': data.country,
          'detail.state': isEmpty(data.state) ? undefined : data.state,
          'detail.city': isEmpty(data.city) ? undefined : data.city,
          'detail.postalCode': data.postalCode,
          'detail.officerName': user?.name ?? '',
          'detail.officerEmail': user?.email ?? '',
        },
      };
      if (data.frontPic && (data.frontPic as any) instanceof File) {
        formData.append('mainMedia', data.frontPic);
      }
      if (data.backPic && (data.backPic as any) instanceof File) {
        formData.append('backMedia', data.backPic);
      }
      if (data.selfie && (data.selfie as any) instanceof File) {
        formData.append('selfieMedia', data.selfie);
      }
      if (data.addressProof && (data.addressProof as any) instanceof File) {
        formData.append('proofOfResidenceMedias', data.addressProof);
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
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>Provide your identity details</Typography>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <StepContainer sx={{ background: Color.priBlue }} />
            <StepContainer sx={{ background: step > 1 ? Color.priBlue : Color.line }} />
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>1/2</Typography>
          </Box>
        </Box>
        {step > 1 ? (
          <ReviewDetailsComponent documentName={documentName} identityData={identityData} imageUrl={imageUrl} />
        ) : (
          <AllFormsInputsComponents
            control={control}
            selectedCountry={selectedCountry}
            setDocumentType={setDocumentType}
            documentType={documentType}
            isSubmitting={isSubmitting}
            setValue={setValue}
          />
        )}
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: '3em' }}>
          {step === 1 && (
            <SecondryButton
              onClick={() => {
                if (selectManageEntity?.status !== 'DRAFT') {
                  navigate('/account/entities');
                } else {
                  setStep(step - 1);
                  setVerifyFormShow(false);
                }
              }}
              type={'button'}
              sx={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid #eaeaea',
              }}
            >
              Cancel
            </SecondryButton>
          )}
          <PrimaryButton disabled={isLoading} type='submit' sx={{ marginLeft: 2 }}>
            {isLoading ? 'Please wait!' : 'Next'}
          </PrimaryButton>
        </Box>
      </form>
    </RoundContainer>
  );
};

export default VerifyNowFormComponent;
