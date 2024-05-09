import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Color } from '../../../theme';
import BoxNotificationMessageComponent from './component/box-notification-message';

const InviteSentAuthrorizedOfficerRequestMessage = () => {
  const navigate = useNavigate();

  const rightClickBtnAction = () => {
    navigate('/account');
  };

  return (
    <BoxNotificationMessageComponent
      isDefault={true}
      heading={'Invite sent to your authorised officer'}
      subHeading={
        <Typography>
          We’ve emailed instructions on how to proceed to <span style={{ color: Color.priBlue }}> authorised officer email </span>
          . You may explore services or visit your dashboard in the meantime.
        </Typography>
      }
      btnRightabel='Continue'
      onRightClickBtnAction={rightClickBtnAction}
      singleButton={true}
    />
  );
};

export default InviteSentAuthrorizedOfficerRequestMessage;
