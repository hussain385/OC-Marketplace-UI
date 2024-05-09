import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Modal from './modal.component';
import { Heading20, Text14 } from '../styles';
import { useAppSelector } from '@/redux/hooks';
import useLogoutEventHandler from '../utils/hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = () => {
  const { hasSessionTimeout, redirectUrl } = useAppSelector((state) => state.mainState.appConfig);
  const [open, setOpen] = useState(false);
  const { rtkLogout } = useLogoutEventHandler();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(hasSessionTimeout);
  }, [hasSessionTimeout]);

  const onOkBtn = async () => {
    await rtkLogout();
    setOpen(false);
    if (redirectUrl) {
      navigate(`/login?redirect=${redirectUrl}`);
    } else {
      navigate(`/login`);
    }
  };

  const renderContent = () => {
    return (
      <Box>
        <Box sx={{ marginBottom: '15px', textAlign: 'center' }}>
          <Heading20>Your session expired</Heading20>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Text14>You&apos;ve been inactive for a while. Please log in to resume your session.</Text14>
        </Box>
      </Box>
    );
  };
  return <Modal isOpen={open} content={renderContent()} okBtnLabel='Log in' onOk={onOkBtn} />;
};

export default SessionTimeout;
