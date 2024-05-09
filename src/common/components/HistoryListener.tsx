import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setClientType } from '@/redux/reducers/authReducers';
import { setCookie } from '@/common/utils/cookie';

function HistoryListener() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { clientType } = useAppSelector((state) => state.mainState.useInfo);

  useEffect(() => {
    if (['/account/billing'].includes(location.pathname) && clientType !== 'buyer') {
      dispatch(setClientType('buyer'));
      setCookie('x-client-type', 'buyer', 15);
    } else if (['/account/financial-hub', '/account/manage-listing'].includes(location.pathname) && clientType !== 'seller') {
      dispatch(setClientType('seller'));
      setCookie('x-client-type', 'seller', 15);
    }
  }, [clientType, dispatch, location.pathname]);

  return <></>;
}

export default HistoryListener;
