import React from 'react';

import { Box } from '@mui/material';

import { Color } from '../../theme';

import { MuiModalTextHeading } from '../styles/common.styles';

import MuiButtonComponent from './mui-button.component';

import useLogoutEventHandler from '../utils/hooks/useLogout';

import PopupModalBox from './popup-modal-box';

interface ModalProps {
  label?: string;
}

const LogoutModalComponent: React.FunctionComponent<ModalProps> = ({ label }: ModalProps) => {
  const { clearAll, closeModal, isLoading } = useLogoutEventHandler();

  return (
    <PopupModalBox>
      <Box
        sx={{
          width: '95%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          maxWidth: { xs: '432px', sm: '504px' },
          height: '178px',
          padding: { xs: '16px', sm: '16px 36px' },
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.12)',
          position: 'fixed',
          background: Color.priWhite,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          borderRadius: '5px',
        }}
      >
        <MuiModalTextHeading sx={{ display: { xs: 'block', sm: 'flex' } }}>
          {label ? label : 'Logging out will end your session and any unsaved changes may be lost. Log out anyway?'}
        </MuiModalTextHeading>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            marginTop: '16px',
            width: '95%',
          }}
        >
          <MuiButtonComponent
            widthSize='208px'
            heightSize='44px'
            style={{
              color: Color.priBlue,
              background: Color.bgGreyLight,
              borderRadius: '2px',
            }}
            onClick={closeModal}
            value='Cancel'
          />

          <MuiButtonComponent
            widthSize='208px'
            heightSize='44px'
            disabled={isLoading}
            style={{
              color: Color.priWhite,
              background: Color.priRed,
              borderRadius: '2px',
            }}
            onClick={clearAll}
            value={isLoading ? 'Loading...' : 'Log out'}
          />
        </Box>
      </Box>
    </PopupModalBox>
  );
};

export default React.memo(LogoutModalComponent);
