import { useRedirectMyInfoSessionBizQuery, useRedirectMyInfoSessionQuery } from '@/redux/apis/authApi';
import { isUndefined } from 'lodash';
import React, { useCallback } from 'react';
import { ReactComponent as RetrieveInfoBtn } from '@/assets/verify-identity/singpass-btn-retrieve-info.svg';
import { ReactComponent as RetrieveInfoBizBtn } from '@/assets/verify-identity/singpass-btn-retrieve-info-biz.svg';
import { useAppDispatch } from '@/redux/hooks';
import { userInfoUpdated } from '@/redux/reducers/authReducers';

export const SingpassRetrieveInfoBizButton = () => {
  const { data: redirectMyInfoSessionBiz } = useRedirectMyInfoSessionBizQuery({});

  const navigateSingpassMyInfoBiz = useCallback(() => {
    if (!isUndefined(redirectMyInfoSessionBiz)) {
      const { client_id, redirect_uri, attributes, purpose, auth_uri, state } = redirectMyInfoSessionBiz;

      const redirect = process.env.NODE_ENV === 'development' ? redirect_uri.replace('myinfo-biz', 'demo') : redirect_uri;

      const singpass = `${auth_uri}?client_id=${client_id}&attributes=${attributes}&purpose=${purpose}&state=${state}&redirect_uri=${redirect}`;
      const url = new URL(singpass as string);
      location.href = url.href;
    }
  }, [redirectMyInfoSessionBiz]);

  return <RetrieveInfoBizBtn style={{ width: '10em', height: 'auto', cursor: 'pointer' }} onClick={navigateSingpassMyInfoBiz} />;
};

export const SingpassRetrieveInfoButton = () => {
  const { data: redirectMyInfoSession } = useRedirectMyInfoSessionQuery();
  const dispatch = useAppDispatch();

  const navigateSingpassMyInfo = useCallback(() => {
    if (!isUndefined(redirectMyInfoSession)) {
      const { auth_uri: singpass, sessionId } = redirectMyInfoSession;

      dispatch(userInfoUpdated({ sessionIdForSingpass: sessionId }));

      const url = new URL(singpass as string);
      location.href = url.href;
    }
  }, [dispatch, redirectMyInfoSession]);

  return <RetrieveInfoBtn style={{ width: '10em', height: 'auto', cursor: 'pointer' }} onClick={navigateSingpassMyInfo} />;
};
