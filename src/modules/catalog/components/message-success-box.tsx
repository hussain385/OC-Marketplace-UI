// @flow
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Color } from '../../../theme';
import MuiAppThemeBtnComponent from '../../../common/components/mui-app-theme-btn.component';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  roomId?: string;
};

export const MessageSuccessBox = ({ isOpen, onClose, roomId }: Props) => {
  const navigate = useNavigate();

  const onCloseHandle = () => {
    onClose && onClose();
  };

  return (
    <Dialog
      sx={(theme) => ({
        '& .MuiDialog-container': {
          width: '100%',
          margin: '0 auto',
          maxWidth: '35em',
          alignItems: { xs: 'flex-end', sm: 'center', md: 'center' },
          background: { xs: 'rgba(255, 255, 255, 0.85)', sm: 'transparent', md: 'transparent' },
        },
        [theme.breakpoints.down('sm')]: {
          '& .MuiDialog-paper': {
            width: '100%',
            margin: '0',
          },
        },
      })}
      open={isOpen}
      onClose={onCloseHandle}
      maxWidth='md'
      fullWidth={true}
    >
      <DialogContent sx={{ padding: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: '20px',
            paddingBottom: '20px',
          }}
        >
          <img
            alt={'success'}
            src={require('../../../assets/success-img/message-success.png').default}
            style={{ width: '100%', height: 'auto' }}
          />
          <Typography sx={{ fontSize: '20px', fontWeight: '800', marginTop: '20px' }}>Your message has been sent!</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: '400', marginBlock: '5px' }}>
            You’ll receive an email once the seller responds.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-evenly',
              marginBlock: '1em',
              marginBottom: '2em',
              gap: '10px',
            }}
          >
            <MuiAppThemeBtnComponent
              type='button'
              heightSize='44px'
              onClick={() => navigate(roomId ? `/chat/${roomId}` : '/chat')}
              widthSize={'12em'}
              style={{
                background: Color.bgGreyLight,
                borderRadius: '2px',
                color: Color.priBlue,
                lineHeight: 1.71,
                paddingInline: '2em',
                letterSpacing: '-0.5px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              value={'View message'}
            />
            <MuiAppThemeBtnComponent
              type='button'
              onClick={onCloseHandle}
              heightSize='44px'
              widthSize={'12em'}
              style={{
                background: Color.priBlue,
                borderRadius: '2px',
                color: Color.priWhite,
                lineHeight: 1.71,
                paddingInline: '2em',
                letterSpacing: '-0.5px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              value={'Done'}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
