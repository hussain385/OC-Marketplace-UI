import React, { useEffect } from 'react';
import { useNavigate } from '@/router.ts';
import BoxNotificationMessageComponent from './component/box-notification-message';
import { ReactComponent as VerificationIcon } from '@/assets/success-img/clock.svg';

const VerificationInProgressMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/account');
    }, 5000);
  }, [navigate]);

  return (
    <BoxNotificationMessageComponent
      isDefault={true}
      singleButton={true}
      heading={'Verification in progress'}
      subHeading='Thanks for providing your info! You’ll receive an email once the verification is completed within 24 hours.'
      customIcon={<VerificationIcon />}
      boxSx={{
        alignItems: 'center',
        textAlign: 'center',
      }}
      noBtnDisplay
      showFooter
    />
  );
};

export default VerificationInProgressMessage;
