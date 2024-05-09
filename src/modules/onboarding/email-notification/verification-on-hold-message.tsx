import React from 'react';
import BoxNotificationMessageComponent from './component/box-notification-message';
import { useNavigate } from 'react-router-dom';

const VerficationOnHoldMessage = () => {
  const navigate = useNavigate();

  const rightClickBtnAction = () => {
    navigate('/account');
  };

  return (
    <BoxNotificationMessageComponent
      isDefault={true}
      heading={'Verification on hold'}
      subHeading='Remember to submit documents to verify your identity so you can access all services. You may explore services or visit your dashboard in the meantime.'
      btnRightabel='Continue'
      onRightClickBtnAction={rightClickBtnAction}
      singleButton={true}
    />
  );
};

export default VerficationOnHoldMessage;
