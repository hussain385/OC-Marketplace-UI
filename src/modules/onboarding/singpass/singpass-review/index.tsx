import React, { useCallback, useEffect, useState } from 'react';
import { ActionButtonPrimary, ActionButtonSecondry, FormLabel, RoundContainer } from '../../../../common/styles';
import SetupOrganisationStepsComponent from '../../components/setup-organisation-steps.component';
import { isEmpty, isUndefined } from 'lodash';
import { Box, Typography } from '@mui/material';
import { Color } from '../../../../theme';
import { singpassInfoMap } from './singpass-form.util';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useVerifyEntityBySingpassMutation } from '../../../../redux/apis/marketplace';
import { OfficerInfo } from '../../components/officer-info/officer-Info.component';
import usePayloadUseInfo from '../../../../common/utils/hooks/usePayloadUseInfo';
import { IOfficerValues } from '../../components/officer-info/offer-info.interface';
import SingpassValidMessage from '../component/singpass-valid-message';
import BackgroundBoxWrapper from '../../../../common/components/background-box.wrapper';
import { AppThemeBtnComponent } from '../../../../common/components/app-theme-btn.component';
import { IndividualStyles } from '../../../../common/styles/freelancer-verify-identity.styles';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';
import singpassReviewStyles from '../styles/singpass-review.styles';
import { identityUserInfoTempDataUpdated } from '../../../../redux/reducers/authReducers';
import { isErrorWithMessage } from '@/common/utils/helpers/rtkError.ts';
import { ReactComponent as CrossIcon } from '@/assets/icons/red-cross-big.svg';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';
import { useNavigate } from '@/router.ts';
import { Link } from 'react-router-dom';

const SingpassInfoText = ({ data }: { data: Array<any> | Record<string, any> }) => {
  return (
    <Box sx={singpassReviewStyles.singpassInfoBoxWrapper}>
      {data.map((value: { title?: string; value?: string }, key: number) => {
        if (!isEmpty(value.value)) {
          return (
            <Box key={key} sx={singpassReviewStyles.singpassInfoBoxContainer}>
              <Typography sx={singpassReviewStyles.singpassInfoBoxContainerLabel1}>{value.title}</Typography>
              <Typography sx={singpassReviewStyles.singpassInfoBoxContainerLabel2}>{value.value}</Typography>
            </Box>
          );
        }
      })}
    </Box>
  );
};

const SingPassReview = () => {
  const {
    useInfo: { verifying_status, selectedEntity },
  } = useAppSelector((state) => state.mainState);

  const [data, setData] = useState<{ title: string; value: string }[]>([]);
  const [officerData, setOfficerData] = useState<{ title: string; value: string }[]>([]);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOfficer, setSelectedOfficer] = useState<IOfficerValues>({
    officerId: '',
    officerName: '',
    position: '',
    email: '',
  });

  const [verifyEntityBySingpass, { error, isLoading }] = useVerifyEntityBySingpassMutation();

  useEffect(() => {
    singpassInfoMap(setData, setOfficerData, verifying_status);
  }, [verifying_status]);

  const { appointment, isRetrieve, singpassId, isExisted } = usePayloadUseInfo();

  // eslint-disable-next-line no-unused-vars
  const onClickHandle = (id: string) => {
    if (!isEmpty(appointment)) {
      setSelectedOfficer(
        appointment?.['appointments-list']
          .filter((value: any) => value?.['person-reference']?.idno?.value === id)
          .map((officer: any) => {
            // dispatch(
            //   identityRegistrationInfo({
            //     ...verifying_status,
            //     identificationName: officer?.['person-reference']?.['person-name']?.value,
            //     identificationEmail: officer?.['corppass-email']?.value,
            //     identificationId: officer?.['person-reference']?.idno?.value,
            //   }),
            // );

            return {
              officerId: officer?.['person-reference']?.idno?.value,
              officerName: officer?.['person-reference']?.['person-name']?.value,
              position: officer.position?.desc,
              email: officer?.['corppass-email']?.value,
            };
          })[0],
      );
    }
  };

  // const handleSubmit = async () => {
  //   await singpassCompanySubmitHandler(
  //     refreshUserToken,
  //     refresh_token,
  //     dispatch,
  //     verifying_status,
  //     selectedOfficer,
  //     entitySetup,
  //     setLoading,
  //     navigation,
  //     selectedEntity.uid,
  //   );
  // };

  const ctaSingpassBtnBiz = useCallback(async () => {
    if (!isUndefined(singpassId)) {
      const entityRes = await verifyEntityBySingpass({ entityId: selectedEntity!.uid, sessionId: singpassId });
      // eslint-disable-next-line no-console
      if ('data' in entityRes) {
        //dispatch(selectedEntityUpdated(entityRes?.data?.data?.entity));
        navigation({ pathname: '/singpass/success', search: `authPerson=${verifying_status.identificationName}` }, {});
        // navigation(`/singpass/success?authPerson=${verifying_status.identificationName}`);
      } else {
        dispatch(
          identityUserInfoTempDataUpdated({
            ...verifying_status,
            isExisted: true,
          }),
        );
      }
    } else {
      dispatch(
        identityUserInfoTempDataUpdated({
          ...verifying_status,
          isExisted: true,
        }),
      );
    }
  }, [dispatch, navigation, selectedEntity, singpassId, verifyEntityBySingpass, verifying_status]);

  const { xs } = useMediaBreakpoint();

  const singpassPrevious = () => {
    navigation('/account/entities/verify-now/company');
  };

  return (
    <BackgroundBoxWrapper onCustomStyles={{ overflow: 'auto' }}>
      <Box sx={{ maxWidth: '748px', marginInline: 'auto', marginTop: '5em' }}>
        <Box style={{ marginTop: '1em', width: '100%' }}>
          {!isUndefined(isRetrieve) && isRetrieve && (
            <RoundContainer>
              <SetupOrganisationStepsComponent step={3} singaporeCompany={true} />
              <SingpassValidMessage />
              <FormLabel>Organisation info</FormLabel>
              <SingpassInfoText data={data} />
              <FormLabel>Authorised officer’s info</FormLabel>
              <Box sx={{ marginBottom: '1em' }}>
                {!isUndefined(appointment) &&
                  appointment?.['appointments-list']?.map((officer: any) => {
                    if (!isEmpty(officer?.['person-reference']?.['person-name']?.value)) {
                      return (
                        <OfficerInfo
                          customStyles={{ background: Color.bgGreyLight }}
                          // onClickHandle={onClickHandle}
                          selectedId={selectedOfficer.officerId}
                          key={officer?.['person-reference']?.idno?.value}
                          isClickable={true}
                          id={officer?.['person-reference']?.idno?.value}
                          name={officer?.['person-reference']?.['person-name']?.value}
                          role={officer.position?.desc}
                        />
                      );
                    }
                  })}
              </Box>
              <FormLabel>My information</FormLabel>
              <SingpassInfoText data={officerData} />
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
                <a target={'_blank'} href='/terms-conditions' style={{ color: Color.priBlue }}>
                  Terms and conditions
                </a>{' '}
                and{' '}
                <a target={'_blank'} href='/privacy-policy' style={{ color: Color.priBlue }}>
                  Privacy policy
                </a>{' '}
                and confirm that the information provided above are accurate.
              </Typography>

              <RenderIf value={!xs}>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <ActionButtonSecondry sx={{ mr: 1 }} color='inherit' onClick={singpassPrevious}>
                    Cancel
                  </ActionButtonSecondry>
                  <ActionButtonPrimary onClick={ctaSingpassBtnBiz}>{isLoading ? 'Loading' : 'Submit'}</ActionButtonPrimary>
                </Box>
              </RenderIf>
              <RenderIf value={xs && isRetrieve === true}>
                <Box sx={singpassReviewStyles.buttonBoxContainer}>
                  <AppThemeBtnComponent
                    customButtonStyle={IndividualStyles.btnCustomStyles}
                    color={Color.pureBlack}
                    backgroundColor={Color.priWhite}
                    text={'Previous'}
                    onClick={singpassPrevious}
                  />
                  <AppThemeBtnComponent
                    type='submit'
                    onClick={ctaSingpassBtnBiz}
                    customButtonStyle={IndividualStyles.btnCustomStyles}
                    hover={Color.priBlue}
                    color={Color.priWhite}
                    backgroundColor={Color.priBlue}
                    text={'Next'}
                  />
                </Box>
              </RenderIf>
            </RoundContainer>
          )}
          {!isRetrieve && (
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CrossIcon style={{ width: '75px', height: '75px', marginBottom: '50px' }} />
              <Typography sx={{ fontSize: '24px', color: Color.pureBlack, fontWeight: '600' }}>
                Sorry, your info can’t be retrieved from Singpass
              </Typography>
              <Typography
                component={'a'}
                sx={{ color: Color.priBlue, fontSize: '20px', fontWeight: '600', cursor: 'pointer' }}
                onClick={() => {
                  navigation(
                    {
                      pathname: selectedEntity?.profile.type.includes(companyProfiles.business)
                        ? '/account/entities/verify-now/company'
                        : '/account/entities/verify-now/freelancer',
                      search: 'open=form',
                    },
                    {},
                  );
                  //dispatch(selectEntityFromManage(selectedEntity!));
                  //dispatch(selectedEntityUpdated(selectedEntity!));
                }}
                style={{ marginTop: '32px', fontSize: '20px', fontWeight: '600' }}
              >
                Click here to verify via manual form
              </Typography>
              <Box sx={{ fontSize: '14px', marginTop: '60px' }}>
                Please contact{' '}
                <Link to='mailto:support@myinfo.gov.sg' target='_blank'>
                  support@myinfo.gov.sg
                </Link>{' '}
                if your require additional assistance.
              </Box>
            </Box>
          )}
          {!isErrorWithMessage(error) && isExisted && (
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CrossIcon style={{ width: '75px', height: '75px', marginBottom: '50px' }} />
              <Typography sx={{ fontSize: '24px', color: Color.pureBlack, fontWeight: '600' }}>
                This organisation account already exists
              </Typography>
              <Box sx={{ fontSize: '14px', marginTop: '60px' }}>
                To gain access, reach out to your account admin or you may contact us at{' '}
                <Link to='mailto:help@opncorp.com' target='_blank'>
                  help@opncorp.com
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </BackgroundBoxWrapper>
  );
};

export default SingPassReview;
