import { SxProps } from '@mui/material';

import React from 'react';
import { BackgroundWrapperCustomStyle } from '../styles/box-wrapper.styles';
import { useGlobalLogoutState } from '../utils/global_state.util';
import LogoutModal from './logout-popup.component';
import NavBar from '@/common/components/navbar';

type BoxWrapperProps = {
  validated?: boolean;
  onLeaveHandler?: () => void;
  children?: React.ReactNode;
  onCustomStyles?: React.CSSProperties | SxProps;
};

const BackgroundBoxWrapper = ({ children, onCustomStyles }: BoxWrapperProps) => {
  const [logoutModal] = useGlobalLogoutState();

  return (
    <BackgroundWrapperCustomStyle
      sx={{
        ...onCustomStyles,
      }}
    >
      <NavBar />
      {children}
      {logoutModal && <LogoutModal />}
    </BackgroundWrapperCustomStyle>
  );
};

export default BackgroundBoxWrapper;
