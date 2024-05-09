import { Box, Typography } from '@mui/material';
import React from 'react';
import LogoutModal from '../../../common/components/logout-popup.component';
import { Color } from '../../../theme';
import { useGlobalLogoutState } from '../../../common/utils/global_state.util';
import NavBar from '@/common/components/navbar';

const TermofCondition = ({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: React.ReactNode;
}) => {
  const [logoutModal] = useGlobalLogoutState();

  return (
    <div>
      <Box
        sx={{
          width: { sm: '96%', md: '100%' },
          margin: 'auto',
        }}
      >
        <NavBar />
        <Box sx={{ maxWidth: '1327px', marginInline: 'auto', padding: { xs: '24px 16px', sm: '0 37px 46px 37px' } }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '32px',
              lineHeigt: '125%',
              letterSpacing: '-0.03em',
              mt: { xs: '0', sm: '36px' },
            }}
          >
            {heading}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              lineHeigt: '125%',
              letterSpacing: '-0.03em',
              color: Color.textHint,
            }}
          >
            {subheading}
          </Typography>
          {children}
        </Box>
        {logoutModal && <LogoutModal />}
      </Box>
    </div>
  );
};

export default TermofCondition;
