import React, { useCallback, useMemo } from 'react';
import { nonSingaporeSchemaType } from '@/modules/onboarding/organisation/non-singapore/schema';
import { ActionButtonPrimary, ActionButtonSecondry, FormLabel, GreyRoundedContainer } from '@/common/styles';
import { Box, Grid, Typography } from '@mui/material';
import { isEmpty, isUndefined, map } from 'lodash';
import { Color } from '@/theme.ts';
import { MuiBox } from '@/modules/seller/account/director-info-edit/upload-id-prove.component.tsx';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAppealEntityMutation, useCreateEntityMutation } from '@/redux/apis/marketplace.ts';
import { useNavigate } from '@/router.ts';
import { selectedEntityUpdated } from '@/redux/reducers/authReducers.ts';
import { useAppDispatch } from '@/redux/hooks.tsx';

interface IReviewDetails {
  data: nonSingaporeSchemaType;
  onPrev: () => void;
}

const imageContainer = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

interface OutputData {
  [key: string]: any;
}

interface InputData {
  [key: string]: any;
}

function convertKeyData<T extends InputData>(input: T, parentKey: string = ''): OutputData {
  const output: OutputData = {};

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof input[key] === 'object') {
        Object.assign(output, convertKeyData<T>(input[key], newKey));
      } else {
        output[newKey] = input[key];
      }
    }
  }

  return output;
}

function convertData(data: nonSingaporeSchemaType) {
  return {
    profile: convertKeyData(data.data.profile),
    identity: convertKeyData(data.data.identity),
  };
}

function ReviewDetails({ data, onPrev }: IReviewDetails) {
  const navigate = useNavigate();
  const [CreateEntity, { isLoading: isLoadingCreate }] = useCreateEntityMutation();
  const [AppealEntity, { isLoading: isLoadingUpdate }] = useAppealEntityMutation();
  const identity = useMemo(() => data.data.identity, [data.data.identity]);
  const profile = useMemo(() => data.data.profile, [data.data.profile]);
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    const formData = new FormData();

    formData.append('data', JSON.stringify(convertData(data)));

    map(data, (value, key) => {
      if (value instanceof File) {
        formData.append(key, value, value.name);
      }
    });

    if (data.data.uid) {
      AppealEntity({ entityId: data.data.uid, body: formData })
        .unwrap()
        .then(() => navigate('/setup-organisation/success'));
    } else {
      CreateEntity(formData)
        .unwrap()
        .then((entity) => {
          dispatch(selectedEntityUpdated(entity));
          navigate('/setup-organisation/success');
        });
    }
  }, [data, AppealEntity, navigate, CreateEntity, dispatch]);

  return (
    <Box>
      <FormLabel>Organisation info</FormLabel>
      <Grid container spacing={'10px'} sx={{ marginTop: '10px' }}>
        {[
          { title: 'Company registration number(CRN)', value: profile.detail.registrationId },
          { title: 'Entity name', value: profile.detail.name },
          { title: 'Entity type', value: profile.detail.type },
          { title: 'Operation address 1', value: profile.detail.firstAddress },
          { title: 'Operation address 2', value: profile.detail.secondAddress },
          { title: 'Country', value: profile.detail.location.country },
          { title: 'State / Province', value: profile.detail.location.state },
          { title: 'City', value: profile.detail.location.city },
          { title: 'Postal code', value: profile.detail.location.postalCode },
        ].map((value, key) => {
          if (value.value) {
            return (
              <>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontSize: '14px !important',
                      fontWeight: '600',
                      color: Color.bgGreyDark,
                      // width: '100%',
                    }}
                  >
                    {value.title}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontSize: '14px !important',
                      fontWeight: '600',
                      wordWrap: 'break-word',
                    }}
                  >
                    {value.value}
                  </Typography>
                </Grid>
              </>
            );
          }
        })}
      </Grid>
      <FormLabel sx={{ marginTop: '1em' }}>Business registration certificate</FormLabel>
      <GreyRoundedContainer sx={{ justifyContent: 'flex-start', gap: '12px', marginTop: '1em' }}>
        <img alt={'file'} src={require('@/assets/icons/file.svg').default} />
        <Typography>{isUndefined(data.certMedia) ? 'No file uploaded' : (data.certMedia as any).name}</Typography>
      </GreyRoundedContainer>
      {identity.type !== 'NONE' ? (
        <>
          <FormLabel sx={{ marginTop: '1em' }}>Authorised officer info</FormLabel>
          <Grid container spacing={'10px'} sx={{ marginTop: '10px' }}>
            {[
              { title: 'Full Name', value: identity.detail.fullname },
              { title: 'Nationality', value: identity.detail.nationality },
              { title: 'Identification number', value: identity.detail.code },
              { title: 'Business role', value: identity.detail.businessRole },
            ].map((value, key) => {
              if (!isEmpty(value.value)) {
                return (
                  <>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontSize: '14px !important',
                          fontWeight: '600',
                          color: Color.bgGreyDark,
                          // width: '30%',
                        }}
                      >
                        {value.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          fontSize: '14px !important',
                          fontWeight: '600',
                          wordWrap: 'break-word',
                        }}
                      >
                        {value.value}
                      </Typography>
                    </Grid>
                  </>
                );
              }
            })}
          </Grid>
          <FormLabel sx={{ marginTop: '1em' }}>{identity.type === 'NATIONAL' ? 'National ID' : 'Passport'} photo</FormLabel>
          <Box
            sx={{
              display: 'flex',
              marginTop: '1em',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '16px',
            }}
          >
            <MuiBox sx={{ border: 'none !important', backgroundColor: Color.bgGreyLight }}>
              <Box sx={imageContainer}>
                <img
                  src={
                    (data.mainMedia as any) instanceof File
                      ? URL.createObjectURL(data.mainMedia as File)
                      : (data.mainMedia as string)
                  }
                  alt=''
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </MuiBox>
            <MuiBox sx={{ border: 'none !important', backgroundColor: Color.bgGreyLight }}>
              <Box sx={imageContainer}>
                <img
                  src={
                    (data.selfieMedia as any) instanceof File
                      ? URL.createObjectURL(data.selfieMedia as File)
                      : (data.selfieMedia as string)
                  }
                  alt=''
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </MuiBox>
          </Box>
          {identity.type === 'NATIONAL' && (
            <MuiBox sx={{ border: 'none !important', marginBlock: '1em', backgroundColor: Color.bgGreyLight }}>
              <Box sx={imageContainer}>
                <img
                  src={
                    (data.backMedia as any) instanceof File
                      ? URL.createObjectURL(data.backMedia as File)
                      : (data.backMedia as string)
                  }
                  alt=''
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </MuiBox>
          )}
        </>
      ) : (
        <>
          <FormLabel sx={{ marginBlock: '1em' }}>Invite your authorised officer to set up your organisation</FormLabel>
          <Typography sx={{ fontSize: '14px !important', fontWeight: '600', maxWidth: { xs: '100%', md: '645px' } }}>
            We’ll email an invite to your duly authorised officer along with instructions on how to finish setting up your
            organisation.
          </Typography>
          <Box>
            {[
              { title: 'Full Name', value: identity.detail.officerName },
              {
                title: 'Email',
                value: identity.detail.officerEmail,
              },
            ].map((value, key) => (
              <Box key={key} sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '10px' }}>
                <Typography
                  sx={{
                    fontSize: '14px !important',
                    fontWeight: '600',
                    color: Color.bgGreyDark,
                    width: '30%',
                  }}
                >
                  {value.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px !important',
                    fontWeight: '600',
                    width: '70%',
                  }}
                >
                  {value.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
      <Typography
        sx={{
          fontSize: '14px !important',
          fontWeight: '600',
          maxWidth: { xs: '100%', md: '645px' },
          marginTop: '1em',
          cursor: 'pointer',
        }}
      >
        <AiFillCheckCircle fontSize={20} color={Color.priBlue} />
        {'  '}By clicking Submit, you agree to OPNCORP&apos;s{' '}
        <a target='_blank' href='/terms-conditions' style={{ color: Color.priBlue }}>
          Terms and conditions
        </a>{' '}
        and{' '}
        <a target='_blank' href='/privacy-policy' style={{ color: Color.priBlue }}>
          Privacy policy
        </a>{' '}
        and confirm that the information provided above are accurate.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', py: 6, visibility: { xs: 'hidden', sm: 'visible' } }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <ActionButtonSecondry sx={{ mr: 1 }} color='inherit' onClick={onPrev}>
          Previous
        </ActionButtonSecondry>
        <ActionButtonPrimary
          style={{ backgroundColor: isLoadingCreate || isLoadingUpdate ? Color.bgLine : Color.priBlue }}
          disabled={isLoadingCreate || isLoadingUpdate}
          onClick={onSubmit}
        >
          {isLoadingCreate || isLoadingUpdate ? 'Loading' : 'Submit'}
        </ActionButtonPrimary>
      </Box>

      <Box sx={{ display: { xs: 'flex', sm: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <ActionButtonSecondry sx={{ width: '50%', borderRadius: 0, height: '50px' }} color='inherit' onClick={onPrev}>
          Previous
        </ActionButtonSecondry>
        <ActionButtonPrimary
          sx={{
            backgroundColor: isLoadingCreate || isLoadingUpdate ? Color.bgLine : Color.priBlue,
            width: '50%',
            borderRadius: 0,
            height: '50px',
          }}
          disabled={isLoadingCreate || isLoadingUpdate}
          onClick={onSubmit}
        >
          {isLoadingCreate || isLoadingUpdate ? 'Loading' : 'Submit'}
        </ActionButtonPrimary>
      </Box>
    </Box>
  );
}

export default ReviewDetails;
