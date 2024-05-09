import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OnBoardingLayout from '../components/onboarding-layout';

function EmailNotification() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const email = search.get('email');
  return (
    <OnBoardingLayout title='Check your inbox' customStyles={{ innerBoxStyle: { border: 'none', background: 'none' } }}>
      <Box sx={{ padding: '20px 46px', textAlign: 'center' }}>
        <Typography sx={{ marginBottom: '16px', fontSize: '14px' }}>
          We&apos;ve sent the password reset link to <strong>{email}</strong>.
        </Typography>
        <Typography sx={{ marginBottom: '16px', fontSize: '14px' }}>
          Didn’t receive the email? You may need to check your junk/spam folder.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '26px',
          }}
        >
          <Button
            type='button'
            variant='contained'
            color='secondary'
            sx={{
              width: '100%',
              borderRadius: '4px',
              height: '44px',
            }}
            onClick={() => navigate('/login')}
          >
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '600',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 1.5,
                letterSpacing: '-0.5px',
                textTransform: 'initial',
              }}
            >
              Back to login
            </Typography>
          </Button>
        </Box>
      </Box>
    </OnBoardingLayout>
  );
}

export default EmailNotification;
