import { isEmpty, isUndefined } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActionButtonPrimary, ActionButtonSecondry, FormLabel, GreyRoundedContainer } from '@/common/styles';
import { Box, Grid, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { MuiBox } from '../../seller/account/director-info-edit/upload-id-prove.component';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.tsx';
import { nonSignaporeComapnyConditions, signaporeComapnyConditions } from './setup-organisation.util';
import { useCreateEntityMutation } from '@/redux/apis/marketplace.ts';
import { identityUserInfoTempDataUpdated } from '@/redux/reducers/authReducers.ts';
import { useNavigate } from '@/router.ts';

type PropType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  authPerson: boolean;
  singaporeCompany: boolean;
  file: any;
  setFile?: React.Dispatch<React.SetStateAction<any>>;
  setDocumentType?: React.Dispatch<React.SetStateAction<string>>;
};

const imageContainer = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

export const ReviewDetailsView = ({ step, setStep, authPerson, singaporeCompany, file, setFile, setDocumentType }: PropType) => {
  const {
    useInfo: { verifying_status },
  } = useAppSelector((state) => state.mainState);
  const [data, setData] = useState<{ title: string; value: string }[]>([]);
  const [officerData, setOfficerData] = useState<{ title: string; value: string }[]>([]);
  const dispatch = useAppDispatch();
  const [CreateEntity, { isLoading }] = useCreateEntityMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (singaporeCompany) {
      signaporeComapnyConditions(setData, setOfficerData, verifying_status, authPerson);
    } else {
      nonSignaporeComapnyConditions(setData, setOfficerData, verifying_status, authPerson);
    }
  }, [verifying_status]);

  const onSubmit = useCallback(async () => {
    const { companyInfo, documentType, nationality, identificationName, identificationNumber, role, dataUrl } = verifying_status;
    const formData = new FormData();

    const profile = {
      type: singaporeCompany ? 'BUSINESS.LOCAL' : 'BUSINESS.INTERNATIONAL',
      'detail.name': singaporeCompany ? companyInfo.companyName : companyInfo.entity_name,
      'detail.type': singaporeCompany ? 'Company' : companyInfo.entity_type,
      'detail.registrationId': singaporeCompany ? companyInfo.uen : companyInfo.crn_num,
      'detail.firstAddress': singaporeCompany ? companyInfo.registerAddress : companyInfo.address1,
      'detail.location.country': companyInfo.country,
      'detail.location.state': companyInfo.state,
      'detail.location.city': companyInfo.city,
      'detail.location.postalCode': companyInfo.postal_code,
      'detail.secondAddress': companyInfo.address2 ? companyInfo.address2 : undefined,
      // 'detail.about': 'string',
      // 'detail.workforce': 'string',
      // 'detail.operationYear': 'number',
    };

    const identity = {
      type: documentType,
      'detail.nationality': nationality,
      'detail.fullname': identificationName,
      'detail.code': identificationNumber,
      'detail.businessRole': role,
    };

    formData.append(
      'data',
      JSON.stringify({
        profile,
        identity,
      }),
    );

    if (!singaporeCompany) {
      formData.append('certMedia', file[0]);
    }

    const mainMedia = await fetch(dataUrl[0])
      .then((res) => res.blob())
      .catch(() => undefined);
    if (mainMedia) {
      formData.append('mainMedia', mainMedia, 'mainMedia.jpg');
    }

    if (documentType === 'NATIONAL') {
      const backMedia = await fetch(dataUrl[1])
        .then((res) => res.blob())
        .catch(() => undefined);
      if (backMedia) {
        formData.append('backMedia', backMedia, 'backMedia.jpg');
      }

      const selfieMedia = await fetch(dataUrl[2])
        .then((res) => res.blob())
        .catch(() => undefined);
      if (selfieMedia) {
        formData.append('selfieMedia', selfieMedia, 'selfieMedia.jpg');
      }
    } else {
      const selfieMedia = await fetch(dataUrl[1])
        .then((res) => res.blob())
        .catch(() => undefined);
      if (selfieMedia) {
        formData.append('selfieMedia', selfieMedia, 'selfieMedia.jpg');
      }
    }

    CreateEntity(formData)
      .unwrap()
      .then(() => navigate('/setup-organisation/success'));
  }, [CreateEntity, file, navigate, singaporeCompany, verifying_status]);

  // const onClickHandler = async () => {
  // setLoading(true);
  // if (authPerson) {
  //   if (singaporeCompany) {
  //     await singaporeCompanySubmitHandler(
  //       refreshUserToken,
  //       refresh_token ?? '',
  //       dispatch,
  //       verifying_status,
  //       uploadUserVerificationMedia,
  //       entitySetup,
  //       setLoading,
  //       navigation,
  //       authPerson,
  //       entityId,
  //     );
  //   } else {
  //     await nonSingaporeCompanySubmitHandler(
  //       refreshUserToken,
  //       refresh_token ?? '',
  //       dispatch,
  //       verifying_status,
  //       uploadUserVerificationMedia,
  //       entitySetup,
  //       setLoading,
  //       navigation,
  //       authPerson,
  //       entityId,
  //       file,
  //     );
  //   }
  // } else {
  //   if (singaporeCompany) {
  //     await singaporeCompanyNotAuthSubmitHandler(
  //       refreshUserToken,
  //       refresh_token ?? '',
  //       dispatch,
  //       verifying_status,
  //       entitySetup,
  //       setLoading,
  //       navigation,
  //       authPerson,
  //       entityId,
  //       getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.seller : USER_GROUP_LOWERCASE.buyer,
  //     );
  //   } else {
  //     await nonSingaporeCompanyNotAuthSubmitHandler(
  //       refreshUserToken,
  //       refresh_token ?? '',
  //       dispatch,
  //       verifying_status,
  //       entitySetup,
  //       setLoading,
  //       navigation,
  //       authPerson,
  //       entityId,
  //       file,
  //       uploadUserVerificationMedia,
  //       getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.seller : USER_GROUP_LOWERCASE.buyer,
  //     );
  //   }
  // }
  // };

  return (
    <Box>
      <FormLabel>Organisation info</FormLabel>
      <Grid container spacing={'10px'} sx={{ marginTop: '10px' }}>
        {data.map((value, key) => {
          if (!isEmpty(value.value)) {
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
      {!singaporeCompany && (
        <>
          <FormLabel sx={{ marginTop: '1em' }}>Business registration certificate</FormLabel>
          <GreyRoundedContainer sx={{ justifyContent: 'flex-start', gap: '12px', marginTop: '1em' }}>
            <img alt={'file'} src={require('../../../assets/icons/file.svg').default} />
            <Typography>
              {isUndefined(verifying_status.documentName) ? 'No file uploaded' : verifying_status.documentName}
            </Typography>
          </GreyRoundedContainer>
        </>
      )}
      {authPerson ? (
        <>
          <FormLabel sx={{ marginTop: '1em' }}>Authorised officer info</FormLabel>
          <Grid container spacing={'10px'} sx={{ marginTop: '10px' }}>
            {officerData.map((value, key) => {
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
          <FormLabel sx={{ marginTop: '1em' }}>
            {verifying_status.documentType === 'NATIONAL' ? 'National ID' : 'Passport'} photo
          </FormLabel>
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
                  src={verifying_status.dataUrl ? verifying_status.dataUrl[0] : ''}
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
                  src={verifying_status.dataUrl ? verifying_status.dataUrl[1] : ''}
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
          {verifying_status.documentType === 'NATIONAL' && (
            <MuiBox sx={{ border: 'none !important', marginBlock: '1em', backgroundColor: Color.bgGreyLight }}>
              <Box sx={imageContainer}>
                <img
                  src={verifying_status.dataUrl ? verifying_status.dataUrl[2] : ''}
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
            {officerData.map((value, key) => (
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
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <ActionButtonSecondry
          sx={{ mr: 1 }}
          color='inherit'
          onClick={() => {
            setFile && setFile(null);
            setDocumentType && setDocumentType('NATIONAL');
            dispatch(
              identityUserInfoTempDataUpdated({
                ...verifying_status,
                isSubmittingValues: undefined,
                dataUrl: undefined,
              }),
            );
            setStep(step - 1);
          }}
        >
          Previous
        </ActionButtonSecondry>
        <ActionButtonPrimary
          style={{ backgroundColor: isLoading ? Color.bgLine : Color.priBlue }}
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? 'Loading' : 'Submit'}
        </ActionButtonPrimary>
      </Box>
    </Box>
  );
};
