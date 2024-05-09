import React from 'react';
import { Box, Dialog, Typography } from '@mui/material';
import MuiTextList from './mui-text.component';
import { styled } from '@mui/system';
import { Color } from '../../theme';

const MuiModalTextHeading = styled(Typography)(() => ({
  width: '100%',
  maxWidth: '432px',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: 1.5,
  letterSpacing: '-0.5px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  color: Color.lightBlack,
  '&:hover': {
    cursor: 'pointer',
  },
}));

const MuiModalTextSubtitle = styled(Typography)(() => ({
  fontSize: '12px',

  lineHeight: 1.35,
  letterSpacing: '-0.2px',
  color: Color.textBlack,
  '&:hover': {
    cursor: 'pointer',
  },
}));

const MuiModalTextTitle = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: 1.71,
  letterSpacing: '-0.5px',

  color: Color.textBlack,
  '&:hover': {
    cursor: 'pointer',
  },
}));

type ModalProps = {
  onCloseHandle: () => void;
  modalOpen: boolean;
};

const SelfieModalPopup: React.FunctionComponent<ModalProps> = ({ onCloseHandle, modalOpen }: ModalProps) => {
  return (
    <Dialog open={modalOpen} onClose={onCloseHandle}>
      <Box
        sx={{
          width: '90%',
          maxWidth: '504px',
          height: 'auto',
          minHeight: '312px',
          padding: '36px',
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.12)',
          position: 'fixed',
          background: Color.priWhite,
          borderRadius: '8px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <MuiModalTextHeading>
          Selfie photo
          <img onClick={onCloseHandle} src={require('../../assets/icons/ic-close.svg').default} alt='' />
        </MuiModalTextHeading>
        <Box
          sx={{
            padding: '7px 0 7px 10px',
            background: '#fbf2d4',
            marginBottom: '16px',
            marginTop: '14px',
          }}
        >
          <MuiModalTextSubtitle>The maximum size is 5.0 MB for photo in jpg/jpeg/png </MuiModalTextSubtitle>
        </Box>
        <MuiModalTextTitle sx={{ marginBottom: '10px' }}>Selfie photo with National ID/Passport</MuiModalTextTitle>
        <Box
          sx={{
            display: 'flex',
            gap: '17px',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Box>
            <img src={require('../../assets/icons/stock-sample5.svg').default} alt='' />
          </Box>
          <MuiTextList
            style={{ lineHeight: 2.1, marginTop: '4px', marginBottom: 0 }}
            lists={[
              {
                icon: require('../../assets/icons/ic-check.svg').default,
                label: 'Take a selfie of yourself with the ID’s front side',
              },
              {
                icon: require('../../assets/icons/ic-check.svg').default,
                label: 'Make sure your whole face is visible and your eyes are open',
              },
              {
                icon: require('../../assets/icons/ic-doc-good.svg').default,
                label: 'Do not crop your ID or use screenshot of your ID',
              },
              {
                icon: require('../../assets/icons/ic-doc-good.svg').default,
                label: 'Do not hide or alter parts of your face (no hats/beauty images/filters/headgear)',
              },
            ]}
            render={(list) => list}
            clickEvent={() => undefined}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default React.memo(SelfieModalPopup);
