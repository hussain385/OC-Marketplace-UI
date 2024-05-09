/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@mui/material';
import { isEmpty, isUndefined } from 'lodash';
import { useSetState } from 'react-use';

import useTeamInvitation from '../../../common/utils/hooks/useTeamInvitationPayload';
import OnBoardingLayout from '../components/onboarding-layout';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import SignupForm from './signup-form';
import EmailForm from './email-form';

import { useLazySingpassInitSessionQuery, useRegisterUserMutation } from '@/redux/apis/authApi';

import { IResponse } from '@/common/interface/response-interface';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AlertMessageBox, showToast, ToastTypes } from '../../../common/utils';
import useTitle from '../../../common/utils/hooks/useTitle';
import { Color } from '../../../theme';
import usePayload from '../../../common/utils/hooks/usePayload';

import { useLazyGetUserMEQuery } from '@/redux/apis/accountApi';
import { useAcceptInvitationMutation } from '@/redux/apis/teamManagementApi';
import { userRoleUpdated } from '@/redux/reducers/authReducers';
import useUniversalLogin from '@/common/utils/hooks/useMultipleLogin';
import { invitationToken } from '@/modules/buyer/redux/actions/teamManagementAction';

import { ReactComponent as SingpassLoginButton } from '@/modules/onboarding/assets/singpass-button.svg';
import { ReactComponent as WarningIcon } from '../../../assets/icons/ic-warning.svg';

const UserCreation = () => {
  const { useInfo } = useAppSelector((state) => state.mainState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlLocation = useLocation();
  const { invitationToken: getInvitationToken, userRoleType } = useTeamInvitation();
  const { registrationToken: singpassToken } = usePayload();
  const { isNotYetRegistered } = usePayload();
  const [initSingpassSession] = useLazySingpassInitSessionQuery();
  const [getUserME] = useLazyGetUserMEQuery();
  const [registerUser, { error: registerUserError }] = useRegisterUserMutation();
  const [acceptInvitation, { error, isSuccess }] = useAcceptInvitationMutation();
  const { conditionAction } = useUniversalLogin();
  const [{ title, whichForm, email }, setState] = useSetState({
    title: 'Log in or sign up for an account',
    whichForm: 'email',
    email: '',
  });
  const { active } = !isUndefined(useInfo.payload) ? useInfo.payload : '';
  const { xs } = useMediaBreakpoint();
  const [search] = useSearchParams();

  useTitle('OPNCORP | REGISTER');

  const navigateSingpass = async () => {
    const { data, isError, isSuccess } = await initSingpassSession({});
    if (isError) {
      showToast('There is some problem at the moment.', ToastTypes.ERROR);
    }
    if (isSuccess) {
      const { client_id, nonce, redirect_uri, response_type, scope, state } = data;
      if (redirect_uri) {
        const singpass = `${
          import.meta.env.VITE_SINGPASS
        }/auth?scope=${scope}&response_type=${response_type}&redirect_uri=${redirect_uri}&nonce=${nonce}&client_id=${client_id}&state=${state}`;
        const url = new URL(singpass as string);
        location.href = url.href;
      }
    }
  };

  const singPassButton = () => {
    return (
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Button
          type='button'
          color='secondary'
          sx={{
            width: '100%',
            maxWidth: '520px',
            borderRadius: '2px',
            height: '50px',
            fontSize: '1.25rem',
            padding: 0,
            '&:hover': {
              background: 'transparent',
            },
          }}
          onClick={navigateSingpass}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: '700',
              fontStyle: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.5px',
              textTransform: 'initial',
              textAlign: 'center',
              color: Color.textGray7E,
              marginRight: '5px',
            }}
          >
            or
          </Typography>
          <SingpassLoginButton />
        </Button>
      </Box>
    );
  };

  const onEmailSubmitHandler = useCallback(
    (data: string) => {
      setState({ email: data, whichForm: 'signup', title: 'Sign up almost done' });
    },
    [setState],
  );

  const onSignupHandler = async (data: any) => {
    const { username, email, password } = data;
    await registerUser({
      name: username,
      email: email,
      password: password,
      mobileCountryCode: '',
      mobile: '',
      role: getInvitationToken ? userRoleType : active ? active : 'buyer',
      invitationToken: getInvitationToken,
      registrationToken: singpassToken,
    })
      .then(async (res: unknown) => {
        const { user, refresh_token } = (res as IResponse).data;

        const id: string = user?.id as string;

        if (!isEmpty(user) && !isUndefined(getInvitationToken)) {
          const roleType = user?.metadata.categories[0] as string;

          // dispatch(userInfoUpdated({ user, token: jwt, refresh_token: refresh_token }));
          dispatch(userRoleUpdated(roleType.toLowerCase()));

          await acceptInvitation({ invitationToken: getInvitationToken, isAccept: true })
            .then(async (res) => {
              if ('data' in res) {
                const latestUserData = await getUserME().unwrap();
                // await dispatch(userInfoUpdated({ user: latestUserData, token: jwt, refresh_token: refresh_token }));

                // dispatch(
                //   selectedEntityUpdated({
                //     uid: latestUserData?.roles[0]?.entityId,
                //   }),
                // );
                AlertMessageBox(xs, 'Invitation accepted successfully.');
                dispatch(invitationToken({}));
                await conditionAction(latestUserData.metadata.categories[0].toLowerCase(), latestUserData, true);
              }
            })
            .catch(() => AlertMessageBox(xs, '', 'Send invitation again'));
        } else if (!isEmpty(user) && isUndefined(getInvitationToken)) {
          // await dispatch(userInfoUpdated({ user: latestUserData, token: jwt, refresh_token: refresh_token }));
          // dispatch(
          //   selectedEntityUpdated({
          //     uid: latestUserData?.roles[0]?.entityId,
          //   }),
          // );
          // dispatch(userRoleUpdated(active === 'seller' ? 'seller' : 'buyer'));

          const redirectUri = search.get('redirect');

          if (redirectUri) {
            navigate(redirectUri);
          } else {
            navigate(`/confirm-email?email=${email}&token=${user!.id}`);
            //navigate('/success');
          }
        } else {
          //TODO disable form button
        }
        //TODO disable form button
      })
      .catch(() => {
        //TODO disable form button
      });
  };

  const subComponent = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Typography component={'span'} sx={{ marginRight: '5px', color: Color.textGray7E, fontWeight: '700' }}>
          Already have an account yet?
        </Typography>
        <Link href='/login' sx={{ color: Color.priBlue, fontWeight: '700', textDecoration: 'none' }}>
          Login here
        </Link>
      </Box>
    );
  };

  const subComponentTwo = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Typography component={'span'} sx={{ marginRight: '5px', color: Color.priBlue, fontWeight: '700' }}>
          {email}
        </Typography>
      </Box>
    );
  };

  const renderSubComponent = () => {
    return whichForm === 'email' ? null : subComponentTwo();
  };

  useEffect(() => {
    if (urlLocation.state) {
      const { email } = urlLocation.state;
      onEmailSubmitHandler(email);
    }
  }, [urlLocation, onEmailSubmitHandler]);

  return (
    <OnBoardingLayout
      title={title}
      subTextComponent={renderSubComponent()}
      footerComponent={whichForm === 'email' && singPassButton()}
    >
      {isNotYetRegistered === true && !isUndefined(isNotYetRegistered) && (
        <Box
          sx={{
            background: 'rgba(244, 51, 61, 0.1)',
            height: '60px',
            maxWidth: '656px',
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            borderRadius: '4px',
            mb: '16px',
          }}
        >
          <Typography
            component='span'
            sx={{
              alignSelf: 'flex-start',
            }}
          >
            <WarningIcon />
          </Typography>
          &nbsp; &nbsp;
          <Typography
            component='span'
            sx={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '-0.03em', maxWidth: '594px' }}
          >
            It seems you haven &apos;t created an account yet via Singpass.To continue, please provide the details below.
          </Typography>
        </Box>
      )}
      <Box sx={{ width: '100%', padding: '46px' }}>
        <RenderIf value={whichForm === 'email'}>
          <EmailForm onSubmit={onEmailSubmitHandler} />
        </RenderIf>
        <RenderIf value={whichForm === 'signup'}>
          <SignupForm onSubmit={onSignupHandler} email={email} />
        </RenderIf>
      </Box>
    </OnBoardingLayout>
  );
};

export default UserCreation;
