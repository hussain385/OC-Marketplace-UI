import { isNull } from 'lodash';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import waitSec from '../../../common/utils/helpers/setTimeout';
import { ToastTypes, showToast } from '../../../common/utils';
import { useAppDispatch } from '../../../redux/hooks';
import { userFromStateUpdated, userInfoUpdated, userRoleUpdated } from '../../../redux/reducers/authReducers';
import { AuthResponse, useLoginwithSingPassMutation } from '../../../redux/apis/authApi';
//import { EntityStatus } from '../../../common/interface';

const SingPassLogin = () => {
  const dispatch = useAppDispatch();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loginwithSingPass] = useLoginwithSingPassMutation();
  const initialized = useRef(false); //hack for twice rendering on develop mode due to React.Strict

  const updateStates = useCallback(
    (res: { data: AuthResponse }) => {
      const obj = {
        token: res.data.jwt as string,
        refresh_token: res.data.refresh_token as string,
        users: res.data.user as any,
        singpassUser: res.data.user.singpassUser as any,
        role: res.data.user.metadata.categories[0] as string,
      };
      dispatch(userInfoUpdated({ user: res.data.user, token: obj.token, refresh_token: obj.refresh_token }));
      dispatch(userRoleUpdated(obj.role.toLowerCase()));
      dispatch(
        userFromStateUpdated({
          name: res.data.user.name,
          email: res.data.user.email,
          active: obj.role.toLowerCase(),
          isRegister: res.data.isRegistered,
        }),
      );
    },
    [dispatch],
  );

  const processVerification = useCallback(async () => {
    const code = search.get('code');
    const state = search.get('state');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await loginwithSingPass({ code: code as string, state: state as string });
    //const role = res?.data?.user.roles[0];
    if (res?.data?.isRegistered === true) {
      // eslint-disable-next-line no-console
      const successMsg = (res as any).data.message as string;

      showToast(successMsg as string, ToastTypes.SUCCESS);
      updateStates(res);
      /**
       * OE-679 remove this condition
       */
      /*
      if (role.entityStatus === EntityStatus.pending) {
        navigate('/profile-choice');
      }
      if (role.entityStatus === EntityStatus.verified) {
        navigate('/account');
      }
      */
      navigate('/account');
    }

    if (res?.data?.isRegistered === false) {
      // showToast('You have not yet created you account' as string, ToastTypes.ERROR);
      // eslint-disable-next-line no-console
      dispatch(
        userFromStateUpdated({
          isNotYetRegistered: true,
          singpass_data: res.data,
          isRegister: res.data.isRegistered,
          registrationToken: res.data?.data?.registrationToken,
        }),
      );

      await waitSec(2000);
      navigate('/create');
    }
  }, [dispatch, loginwithSingPass, navigate, search, updateStates]);

  useEffect(() => {
    if (!initialized.current && !isNull(search.get('code')) && !isNull(search.get('state'))) {
      initialized.current = true;
      processVerification();
    }
  }, [processVerification, search]);

  return (
    <Box>
      <Typography>...Please wait getting information from Singpass.</Typography>
    </Box>
  );
};

export default SingPassLogin;
