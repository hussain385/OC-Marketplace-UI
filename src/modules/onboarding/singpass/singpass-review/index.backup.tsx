import React, { useCallback, useEffect, useState } from 'react';
import { OrganistaionSelection } from '../../components/organisation-selection/organisation-selection.component';
import { ActionButtonPrimary, ActionButtonSecondry, FormLabel, RoundContainer } from '../../../../common/styles';
import { useNavigate } from 'react-router-dom';
import SetupOrganisationStepsComponent from '../../components/setup-organisation-steps.component';
import { isEmpty, isUndefined } from 'lodash';
import { Box, Typography } from '@mui/material';
import { Color } from '../../../../theme';
import { singpassInfoMap } from './singpass-form.util';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useEntitySetupSingpassCreationMutation } from '../../../../redux/apis/marketplace';
import { OfficerInfo } from '../../components/officer-info/officer-Info.component';
import usePayloadUseInfo from '../../../../common/utils/hooks/usePayloadUseInfo';
import { IOfficerValues } from '../../components/officer-info/offer-info.interface';
import SingpassValidMessage from '../component/singpass-valid-message';
import SingpassInvalidMessageComponent from '../component/singpass-invalid-message';
import BackgroundBoxWrapper from '../../../../common/components/background-box.wrapper';
import { AppThemeBtnComponent } from '../../../../common/components/app-theme-btn.component';
import { IndividualStyles } from '../../../../common/styles/freelancer-verify-identity.styles';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';
import singpassReviewStyles from '../styles/singpass-review.styles';
import { identityUserInfoTempDataUpdated, selectedEntityUpdated } from '../../../../redux/reducers/authReducers';
import { isErrorWithMessage } from '@/common/utils/helpers/rtkError.ts';

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
    useInfo: { verifying_status },
  } = useAppSelector((state) => state.mainState);

  const [data, setData] = useState<{ title: string; value: string }[]>([]);
  const [officerData, setOfficerData] = useState<{ title: string; value: string }[]>([]);
  const [singaporeCompany, setSingaporeCompany] = useState<boolean>(true);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOfficer, setSelectedOfficer] = useState<IOfficerValues>({
    officerId: '',
    officerName: '',
    position: '',
    email: '',
  });

  const [entitySetupSingpassCreation, { error, isLoading }] = useEntitySetupSingpassCreationMutation();

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
      const entityRes = await entitySetupSingpassCreation({ profileType: 'LOCAL', sessionId: singpassId });

      if ('data' in entityRes) {
        dispatch(selectedEntityUpdated(entityRes?.data?.data?.entity));
        navigation(`/singpass/success?authPerson=${verifying_status.identificationName}`);
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
  }, [dispatch, entitySetupSingpassCreation, navigation, singpassId, verifying_status]);

  const { xs } = useMediaBreakpoint();

  const singpassPrevious = () => {
    navigation('/setup-organisation');
  };

  return (
    <BackgroundBoxWrapper onCustomStyles={{ overflow: 'auto' }}>
      <Box sx={{ maxWidth: '748px', marginInline: 'auto', marginTop: '5em' }}>
        <OrganistaionSelection
          singaporeTitle='Local company'
          onBackBtnListener={() => navigation(-1)}
          label={'Is your organisation incorporated in Singapore?'}
          singaporeCompany={singaporeCompany}
          setSingaporeCompany={setSingaporeCompany}
        />
        <RoundContainer style={{ marginTop: '1em', width: '100%' }}>
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
              <ActionButtonSecondry sx={{ mr: 1 }} color='inherit'>
                Previous
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
          {!isUndefined(isRetrieve) && isRetrieve === false && (
            <SingpassInvalidMessageComponent closeFunction={() => navigation('/setup-organisation')} />
          )}
          {!isUndefined(isExisted) && isExisted === true && (
            <SingpassInvalidMessageComponent
              closeFunction={() => navigation('/setup-organisation')}
              customStyles={{ background: 'rgb(89,89,89)' }}
              title={isErrorWithMessage(error) ? error.data.message : 'This organisation account already exists'}
              desc={
                <span>
                  To gain access, reach out to your account admin or you may contact us at{' '}
                  <span style={{ color: Color.priBlue }}>help@opncorp.com</span> for more info.
                </span>
              }
            />
          )}
        </RoundContainer>
      </Box>
    </BackgroundBoxWrapper>
  );
};

export default SingPassReview;
