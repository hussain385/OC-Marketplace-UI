import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { isNull } from 'lodash';
import { useAppDispatch } from '@/redux/hooks';
import { updateRedirectUrlAction } from '@/redux/reducers/appReducers';

function useBackToLogin() {
  const navigate = useNavigate();
  const distpach = useAppDispatch();
  const [query] = useSearchParams();
  const redirect = useCallback(
    (extraParams?: Record<string, string>) => {
      const params = new URLSearchParams({
        ...extraParams,
      });
      if (isNull(query.get('redirect')) && !['/', '/seller'].includes(window.location.pathname)) {
        params.append('redirect', window.location.pathname + window.location.search);
        //updating appConfig state
        distpach(updateRedirectUrlAction(params.get('redirect')!));
      }
      navigate(`/login?${params}`);
    },
    [navigate, query],
  );

  return { redirect };
}

export default useBackToLogin;
