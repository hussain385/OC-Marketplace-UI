import { isNull, isUndefined } from 'lodash';

import { useLocation, useNavigate } from 'react-router-dom';

import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import useUniversalLogin from '../../common/utils/hooks/useMultipleLogin';
import { invitationValuesUpdated, userFromStateUpdated, userLogout } from '../../redux/reducers/authReducers';
import { unmountCacheData } from '@/common/utils/helpers/cache';
import LoginComponent from './component/login.component';

const Login = () => {
  const {
    useInfo: { reset, user },
  } = useAppSelector((state) => state.mainState);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    if (!isUndefined(user)) {
      navigate('/account');
    }
    if (reset === true && !isUndefined(reset)) {
      dispatch(userLogout());
      localStorage.clear();
      localStorage.removeItem('persist:root');
      unmountCacheData();
    }

    if (!isNull(queryParams.get('token'))) {
      dispatch(userFromStateUpdated({ email: queryParams.get('email'), active: queryParams.get('category') }));
      dispatch(
        invitationValuesUpdated({
          inviteToken: queryParams.get('token'),
          inviteCategory: queryParams.get('category'),
          companyName: queryParams.get('companyName'),
          companyUEN: isNull(queryParams.get('companyUEN')) ? '' : queryParams.get('companyUEN'),
          userInviteEmail: queryParams.get('email'),
        }),
      );
      if (Number(queryParams.get('userExisted')) === 0) {
        navigate('/create');
      }
    }
  }, []);

  const {
    onSubmitHandler,
    formSubmitted,
    loginError,
    acceptError,
    acceptSuccess,
    userInviteEmail,
    setValidated,
    validated,
    country,
    setCountry,
    countryName,
    setCountryName,
  } = useUniversalLogin();

  return (
    <LoginComponent
      onSubmitHandler={onSubmitHandler}
      formSubmitted={formSubmitted}
      loginError={loginError}
      acceptError={acceptError}
      acceptSuccess={acceptSuccess}
      userInviteEmail={userInviteEmail}
      validated={validated}
      setValidated={setValidated}
      country={country}
      setCountry={setCountry}
      countryName={countryName}
      setCountryName={setCountryName}
    />
  );
};

export default Login;
