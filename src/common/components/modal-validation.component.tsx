import React from 'react';
import { Box, Typography, Dialog } from '@mui/material';
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
  label?: string;
};

const ModalValidation: React.FunctionComponent<ModalProps> = ({ onCloseHandle, label, modalOpen }: ModalProps) => {
  return (
    <Dialog open={modalOpen} onClose={onCloseHandle}>
      <Box
        sx={{
          width: '95%',
          maxWidth: '504px',
          height: 'auto',
          padding: '40px 36px',
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.12)',
          position: 'fixed',
          borderRadius: '8px',
          background: Color.priWhite,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <MuiModalTextHeading sx={{ marginTop: '14px' }}>
          {label ? label : 'National ID / Passport photo'}
          <img
            onClick={() => {
              onCloseHandle();
            }}
            src={require('../../assets/icons/ic-close.svg').default}
            alt=''
          />
        </MuiModalTextHeading>
        <Box
          sx={{
            padding: '7px 0 7px 10px',
            background: '#fbf2d4',
            marginBottom: '10px',
          }}
        >
          <MuiModalTextSubtitle>The maximum size is 5.0 MB for photo in jpg/jpeg/png </MuiModalTextSubtitle>
        </Box>
        <MuiModalTextTitle sx={{ marginBottom: '10px' }}>Upload image of ID card</MuiModalTextTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: { xs: '10px', sm: '40px' },
            marginBottom: '16px',
          }}
        >
          <img src={require('../../assets/icons/stock-sample1.svg').default} alt='' />
          <img src={require('../../assets/icons/stock-sample2.svg').default} alt='' />
          <img src={require('../../assets/icons/stock-sample3.svg').default} alt='' />
          <img src={require('../../assets/icons/stock-sample4.svg').default} alt='' />
        </Box>

        <MuiTextList
          lists={[
            {
              icon: require('../../assets/icons/ic-check.svg').default,
              label: 'Goverment-issued',
            },
            {
              icon: require('../../assets/icons/ic-check.svg').default,
              label: 'Original full-sized, unedited documents',
            },
            {
              icon: require('../../assets/icons/ic-check.svg').default,
              label: 'Place documents against a single-coloured background',
            },
            {
              icon: require('../../assets/icons/ic-check.svg').default,
              label: 'Readable, well-lit,coloured images',
            },
            {
              icon: require('../../assets/icons/ic-doc-good.svg').default,
              label: 'No black and white images',
            },
            {
              icon: require('../../assets/icons/ic-doc-good.svg').default,
              label: 'No editor or expired documents',
            },
          ]}
          render={(list) => list}
          clickEvent={() => undefined}
        />
      </Box>
    </Dialog>
  );
};

export default React.memo(ModalValidation);
