// @flow
import React, { useEffect } from 'react';
import { useNavigate } from '@/router.ts';
import BoxNotificationMessageComponent from '../email-notification/component/box-notification-message';
import useQueryParams from '@/common/utils/hooks/useQueryParams';

export const SetupSuccess = () => {
  const [search] = useQueryParams();
  const authPerson = search.get('authPerson');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/account');
    }, 5000);
  }, [navigate]);

  return (
    <BoxNotificationMessageComponent
      singleButton={true}
      isDefault={true}
      boxSx={{
        alignItems: 'center',
        textAlign: 'center',
      }}
      boxWrapperStyle={{ border: 'none' }}
      heading={authPerson ? 'Invite sent to your authorised officer' : 'Business added!'}
      subHeading={
        authPerson
          ? `We’ve emailed instructions on how to proceed to ${authPerson}. You may explore services or visit your dashboard in the meantime.`
          : ''
      }
      noBtnDisplay
      showFooter={!authPerson}
    />
  );
};
