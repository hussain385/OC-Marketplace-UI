import { isUndefined } from 'lodash';
import { useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { useMediaBreakpoint } from '../../components';
import usePayloadUseInfo from './usePayloadUseInfo';
import { identityUserInfoTempDataUpdated } from '../../../redux/reducers/authReducers';

const useHistoryBack = () => {
  const navigate = useNavigate();

  const { isSubmittingValues } = usePayloadUseInfo();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { xs } = useMediaBreakpoint();

  const historyBack = (router: string, cb: () => void) => {
    isUndefined(isSubmittingValues) ? navigate(router) : cb();
  };

  const ctaPrevBtn = useCallback(() => {
    dispatch(identityUserInfoTempDataUpdated({}));
  }, []);

  const backRoute = () => {
    if (location.pathname.includes('/login') && xs) {
      historyBack('/', ctaPrevBtn);
    } else {
      historyBack('/account/entities', ctaPrevBtn);
    }
  };

  return { historyBack, backRoute, ctaPrevBtn };
};

export default useHistoryBack;
