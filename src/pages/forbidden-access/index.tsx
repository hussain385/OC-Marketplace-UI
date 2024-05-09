import React from 'react';
import { Box, Typography } from '@mui/material';
import { PrimaryButton } from '@/common/styles';
import LinkBehavior from '@/common/components/LinkBehavior.tsx';
import { ReactComponent as NotAllowedImage } from '@/assets/common-svg/not-allowed.svg';
import MainLayout from '@/common/layout/main.layout.tsx';

/***
  Temporary BLocker page to demo
 ***/
function Blocker() {
  return (
    <MainLayout
      pageTitle='Forbidden access'
      breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Forbidden access' }]}
    >
      <Box sx={{ margin: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <NotAllowedImage width={300} height={400} />
        <Typography sx={{ fontWeight: 700, fontSize: '20px !important', mt: '16px' }}>
          We’re sorry, but you don’t have access to this page
        </Typography>
        <Typography sx={{ fontWeight: 400, color: '#7E7E7E', mt: '8px' }}>
          Reach out to your account owner or admin to request the necessary permissions
        </Typography>
        <PrimaryButton
          as={LinkBehavior}
          sx={{ mt: '16px', padding: '8px 40px', borderRadius: '4px', lineHeight: '26px' }}
          href={'/account'}
        >
          Back to dashboard
        </PrimaryButton>
      </Box>
    </MainLayout>
  );
}

export default Blocker;
