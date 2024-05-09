import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import BoxNotificationMessageComponent from './component/box-notification-message';

const OrganizationVerifiedMessage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const rightClickBtnAction = useCallback(() => {
    //for business verification success redirect to dashboard either buyer or seller
    navigate('/account');
    // if (!isUndefined(user?.metadata) && getCookie('x-client-type') === 'seller') {
    //   dispatch(companySetupStepUpdated(1));
    //   navigate('/account/profile');
    // } else {
    //   navigate('/account');
    // }
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      rightClickBtnAction();
    }, 3000);
  }, [dispatch, navigate, rightClickBtnAction]);

  return (
    <BoxNotificationMessageComponent
      isDefault={true}
      heading={'This business is now verified'}
      subHeading='Thanks for providing your info! You now have access to all features.'
      boxSx={{ justifyContent: 'center', alignItems: 'center' }}
      hideActionButtons={true}
      showFooter
    />
  );
};

export default OrganizationVerifiedMessage;
