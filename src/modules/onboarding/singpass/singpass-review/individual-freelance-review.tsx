import { Box, Grid, Typography } from '@mui/material';

import React, { useCallback } from 'react';

import BackgroundBoxWrapper from '../../../../common/components/background-box.wrapper';

import {
  IdentityParagraphInfo,
  IdentityRegistrationInfo,
  IndividualStyles,
} from '../../../../common/styles/freelancer-verify-identity.styles';

import { gridUtilityStyle, utilityStyles } from '../../../../common/styles/utility.styles';

import { Color } from '../../../../theme';

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import usePayloadUseInfo from '../../../../common/utils/hooks/usePayloadUseInfo';

import { isUndefined } from 'lodash';

import { useVerifyEntityBySingpassMutation } from '../../../../redux/apis/marketplace';

import { RenderIf } from '../../../../common/components';

import { Link } from 'react-router-dom';

import SingpassValidMessage from '../../singpass/component/singpass-valid-message';

import { identityUserInfoTempDataUpdated } from '../../../../redux/reducers/authReducers';
import { isErrorWithMessage } from '@/common/utils/helpers/rtkError.ts';
import { ReactComponent as CrossIcon } from '@/assets/icons/red-cross-big.svg';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { RoundContainer } from '@/common/styles';
import { AiFillCheckCircle } from 'react-icons/ai';
import { useNavigate } from '@/router.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IdentityRegistrationInfoComponent = () => {
  const { identificationName, identificationNumber, nationality, isRetrieve } = usePayloadUseInfo();
  const { topx18, bottomx24 } = utilityStyles;
  return (
    <Box sx={{ mt: topx18, mb: bottomx24 }}>
      <SingpassValidMessage />
      <IdentityRegistrationInfo>{isRetrieve === true ? 'Identity info' : 'Identity registration info'}</IdentityRegistrationInfo>
      <Grid container spacing={'10px'} sx={{ marginTop: '10px' }}>
        <Grid item xs={6}>
          <IdentityParagraphInfo sx={{ color: Color.textHint }}>Full name</IdentityParagraphInfo>
        </Grid>
        <Grid item xs={6}>
          <IdentityParagraphInfo sx={{ color: Color.pureBlack, wordBreak: 'break-word', lineHeight: 'normal' }}>
            {identificationName}
          </IdentityParagraphInfo>
        </Grid>
        <Grid item xs={6}>
          <IdentityParagraphInfo sx={{ color: Color.textHint }}>Nationality</IdentityParagraphInfo>
        </Grid>
        <Grid item xs={6}>
          <IdentityParagraphInfo sx={{ color: Color.pureBlack }}>{nationality}</IdentityParagraphInfo>
        </Grid>
        <Grid item xs={6}>
          <IdentityParagraphInfo sx={{ color: Color.textHint }}>ID</IdentityParagraphInfo>
        </Grid>

        <Grid item xs={6}>
          <IdentityParagraphInfo sx={{ color: Color.pureBlack }}>{identificationNumber}</IdentityParagraphInfo>
        </Grid>
      </Grid>
    </Box>
  );
};

const SingPassIndividualReview = () => {
  const dispatch = useAppDispatch();
  const { isRetrieve, singpassId, verifying_status, isExisted } = usePayloadUseInfo();
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  const { mdx12 } = gridUtilityStyle;

  const [verifyEntityBySingpass, { error, isLoading }] = useVerifyEntityBySingpassMutation();
  const navigate = useNavigate();

  const ctaSingpassBtn = useCallback(async () => {
    if (!isUndefined(singpassId)) {
      const entityRes = await verifyEntityBySingpass({ entityId: selectedEntity!.uid, sessionId: singpassId });

      if ('data' in entityRes) {
        //dispatch(selectedEntityUpdated(entityRes?.data?.data?.entity));
        navigate('/identity-verified'); //success message redirect
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
  }, [dispatch, navigate, selectedEntity, singpassId, verifyEntityBySingpass, verifying_status]);

  const handleCancel = () => {
    navigate('/account/entities/verify-now/freelancer');
  };

  return (
    <BackgroundBoxWrapper onCustomStyles={IndividualStyles.backgroundWrapperImage}>
      <Box sx={{ maxWidth: '748px', marginInline: 'auto', marginTop: '5em' }}>
        <RenderIf value={isRetrieve}>
          <Box style={{ marginTop: '1em', width: '100%' }}>
            <RoundContainer>
              <Grid xs={12} md={mdx12} sx={{ mb: { xs: 8, sm: 'unset' } }}>
                <IdentityRegistrationInfoComponent />
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
                  By clicking Submit, you agree to OPNCORP&apos;s{' '}
                  <a target={'_blank'} href='/terms-conditions' style={{ color: Color.priBlue }}>
                    Terms and conditions
                  </a>{' '}
                  and{' '}
                  <a target={'_blank'} href='/privacy-policy' style={{ color: Color.priBlue }}>
                    Privacy policy
                  </a>{' '}
                  and confirm that the information provided above are accurate.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <Box sx={{ display: 'flex', gap: '5%' }}>
                    <AppThemeBtnComponent
                      customButtonStyle={IndividualStyles.btnCustomStyles}
                      color={Color.priBlue}
                      backgroundColor={Color.priWhite}
                      text={'Cancel'}
                      onClick={handleCancel}
                    />
                    <AppThemeBtnComponent
                      type='button'
                      onClick={ctaSingpassBtn}
                      customButtonStyle={IndividualStyles.btnCustomStyles}
                      hover={Color.priBlue}
                      color={Color.priWhite}
                      backgroundColor={Color.priBlue}
                      text={isLoading ? 'Loading' : 'Submit'}
                    />
                  </Box>
                </Box>
              </Grid>
            </RoundContainer>
          </Box>
        </RenderIf>
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
                navigate({ pathname: '/account/entities/verify-now/freelancer', search: 'open=form' }, {});
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
              This account is already exists
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
    </BackgroundBoxWrapper>
  );
};

export default SingPassIndividualReview;
