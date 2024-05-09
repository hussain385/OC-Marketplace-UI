import { Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { Color } from '../../theme';
import useMediaBreakpoint from './breakpoint';
import PopupBox from './popup-modal-box';
import RenderIf from './render-if.component';

const OtpExceedAttempt = ({ isChangeHide }: { isChangeHide: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  const onHide = useCallback(() => {
    isChangeHide(false);
  }, [isChangeHide]);

  return (
    <PopupBox
      childrenStyle={{
        width: '95%',
        maxWidth: '504px',
        borderRadius: '8px',
        height: 'auto',
        padding: { xs: '40px 18px', md: '40px 36px' },
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.12)',
        position: 'fixed',
        background: Color.priWhite,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }}
    >
      <RenderIf value={xs}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '24px',
            lineHeight: '1.5',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
          }}
        >
          Exceeded number of tries
        </Typography>
      </RenderIf>
      <RenderIf value={sm || mdLg}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '24px',
            lineHeight: '1.5',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
          }}
        >
          The limit for changing mobile number
        </Typography>
      </RenderIf>
      <Typography
        sx={{
          fontSize: '14px',
          lineHeight: '1.43',
          letterSpacing: '-0.5px',
          marginBottom: '24px',
          color: Color.pureBlack,
        }}
      >
        For security reasons,you can only change your mobile number 5 times for account creation. Please contact us via email
        &nbsp;
        <span style={{ color: Color.priBlue }}>help@opncorp.com</span> if your are facing issues with registration
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <Button
          onClick={onHide}
          variant='contained'
          sx={{
            width: { xs: '100%', md: '50%' },
            borderRadius: '2px',
            height: '44px',
            fontSize: '1.25rem',
            marginTop: '8px',
            background: Color.priBlue,
            color: Color.priWhite,
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontStretch: 'normal',
              fontStyle: 'normal',
              lineHeight: 1.5,
              letterSpacing: '-0.5px',
              textTransform: 'initial',
            }}
          >
            {/* {formSubmitted ? 'Please Wait...' : 'Continue'} */}
            Done
          </Typography>
        </Button>
      </Box>
    </PopupBox>
  );
};

export default OtpExceedAttempt;
