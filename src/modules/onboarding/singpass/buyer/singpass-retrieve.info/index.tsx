import { isUndefined } from 'lodash';
import React, { useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PopupModalBox from '../../../../../common/components/popup-modal-box';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { useRetrieveSingpassInfoMutation } from '../../../../../redux/apis/authApi';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Color } from '../../../../../theme';
import BackgroundBoxWrapper from '../../../../../common/components/background-box.wrapper';
import { IndividualStyles } from '../../../../../common/styles/freelancer-verify-identity.styles';
import useSafeRender from '../../../../../common/utils/hooks/useSafeRender';
import { identityUserInfoTempDataUpdated } from '../../../../../redux/reducers/authReducers';

const SingpassRetrieveInfo = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [retrieveSingpassInfo] = useRetrieveSingpassInfoMutation();
  const initialized = useRef(false);
  const { sessionIdForSingpass } = useAppSelector((state) => state.mainState.useInfo);

  const retrievingSingpassInformation = useCallback(async () => {
    const code = search.get('code');
    const state = search.get('state');

    if (!code) {
      dispatch(
        identityUserInfoTempDataUpdated({
          isRetrieve: false,
        }),
      );
      navigate('/account/entities/verify-now/freelancer');
      return;
    }

    const res: any = await retrieveSingpassInfo({
      code: code,
      state: state,
      sessionId: sessionIdForSingpass,
    }).catch((err) => err);

    if ('data' in res) {
      const objRes = {
        name: res.data?.name?.value as string,
        nationality: res.data?.nationality?.desc as string,
        identificationNumber: res.data?.uinfin?.value as string,
        singpassId: res.data?.sessionId as string,
      };

      dispatch(
        identityUserInfoTempDataUpdated({
          isRetrieve: true,
          isNextChange: true,
          identificationName: objRes.name,
          nationality: objRes.nationality,
          identificationNumber: objRes.identificationNumber,
          singpassId: objRes.singpassId,
        }),
      );
    } else {
      dispatch(
        identityUserInfoTempDataUpdated({
          isRetrieve: false,
        }),
      );
    }

    navigate('/account/entities/verify-now/freelancer');
  }, [dispatch, navigate, retrieveSingpassInfo, search, sessionIdForSingpass]);

  useSafeRender(() => {
    if (!isUndefined(search.get('code')) && !isUndefined(search.get('state')) && !initialized.current) {
      initialized.current = true;
      retrievingSingpassInformation();
    }
  });

  return (
    <BackgroundBoxWrapper onCustomStyles={IndividualStyles.backgroundWrapperImage}>
      <PopupModalBox
        parentStyle={{ background: 'transparent' }}
        childrenStyle={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress sx={{ color: Color.textHint, fontWeight: 400 }} size={60} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='caption' component='h6' color='text.secondary'>
              Loading
            </Typography>
          </Box>
        </Box>
      </PopupModalBox>
    </BackgroundBoxWrapper>
  );
};

export default SingpassRetrieveInfo;
