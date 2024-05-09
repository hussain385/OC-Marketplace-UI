import { isNil } from 'lodash';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { persistor } from '@/redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setCookie } from '../cookie';
import { useGlobalLogoutState, useValidated } from '../global_state.util';
//import { unmountCacheData } from '../helpers/cache';
import { useLogoutUserMutation } from '../../../redux/apis/authApi';
import { baseApi } from '../../../redux/baseAPI';
import { userLogout } from '../../../redux/reducers/authReducers';
import { clearAllStateAction } from '@/redux/actions';
import { SocketIOManager } from '@/modules/communication/socket-io';

const useLogoutEventHandler = () => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const { token } = useAppSelector((state) => state.mainState.useInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setValidated] = useValidated();
  const [, setLogout] = useGlobalLogoutState();

  const closeModal = useCallback(() => {
    setLogout(false);
  }, [setLogout]);

  async function cacheClear() {
    if (!isNil(token) && token !== '') {
      await logoutUser();
    }
    await persistor.flush();

    dispatch(userLogout());
    dispatch(clearAllStateAction());

    localStorage.removeItem('persist:OPNCORP');
    //unmountCacheData();
    setValidated(false);
    setLogout(false);
    setCookie('isLoggedIn', 'false', 1);
    setCookie('token', '', 0);
    dispatch(baseApi.util?.resetApiState());
    SocketIOManager.getInstance().disconnect();
    navigate('/');
  }

  const clearAll = useCallback(() => {
    cacheClear();
    //setCookie('x-client-type', 'buyer', 1); don't remove the cache discussed with Ivan
  }, []);

  const clearAllExcludeCookies = useCallback(() => {
    cacheClear();
    navigate('/');
  }, []);

  const rtkLogout = async () => {
    await persistor.flush();
    dispatch(userLogout());
    dispatch(clearAllStateAction());
    localStorage.removeItem('persist:OPNCORP');
    setValidated(false);
    setLogout(false);
    setCookie('isLoggedIn', 'false', 1);
    setCookie('token', '', 0);
    dispatch(baseApi.util?.resetApiState());
    SocketIOManager.getInstance().disconnect();
  };

  return { isLoading, clearAll, closeModal, clearAllExcludeCookies, rtkLogout };
};

export default useLogoutEventHandler;
