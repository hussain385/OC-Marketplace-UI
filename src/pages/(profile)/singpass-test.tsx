import React, { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { identityUserInfoTempDataUpdated } from '@/redux/reducers/authReducers';
import waitSec from '@/common/utils/helpers/setTimeout';
import { useNavigate } from 'react-router-dom';

/**
 * @description This route is for testing Sinpass api data after myinfo / myinfo-biz api called
 * @returns React Component
 */

const SingpassTestPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      identityUserInfoTempDataUpdated({
        isRetrieve: true,
        identificationName: 'BERNARD LI GUO HAO',
        nationality: 'MALAYSIAN',
        identificationNumber: 'S0290695C',
        singpassId: 'e63cd6f0-6e85-4951-b96b-055d69eb3acf',
      }),
    );
    waitSec(3000);
    navigate('/singpass/individual-review');
  }, [dispatch, navigate]);

  return <div>Singpass Info Api Test</div>;
};

export default SingpassTestPage;
