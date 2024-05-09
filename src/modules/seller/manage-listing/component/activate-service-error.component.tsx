import React, { useMemo } from 'react';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { Color } from '@/theme';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import { useNavigate } from '@/router';
import { isNil } from 'lodash';

type componentProps = {
  open: boolean;
  onCloseHandle: () => void;
};

const ActivateServiceErrorComponent = ({ open, onCloseHandle }: componentProps) => {
  const navigate = useNavigate();
  const { selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const status = useMemo(
    () => isNil(selectedRole?.entityStatus) || selectedRole?.entityStatus === 'DRAFT',
    [selectedRole?.entityName, selectedRole?.entityType],
  );

  const onClickHandler = () => {
    navigate('/account/entities/verify-now/freelancer');
    onCloseHandle();
  };

  return (
    <Dialog open={open} onClose={onCloseHandle} maxWidth={'md'} fullWidth={true}>
      <DialogContent sx={{ padding: '24px', display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '700', marginTop: '1em', textAlign: 'center' }}>
          {!status ? 'Verification in progress' : 'Verification required'}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '400', marginTop: '0.3em', textAlign: 'center' }}>
          {!status
            ? "Once you're a verified seller, you can activate your services and showcase them to potential buyers. Prepare your listings ahead of time and make sure all details are set so you can launch immediately after verification."
            : "To activate your service, you need to complete verification. It's essential to boost trust, visibility, and sales, providing a better experience for buyers."}
        </Typography>
        <Box
          sx={{
            marginTop: '2em',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '1em',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <AppThemeBtnComponent
            onClick={!status ? onCloseHandle : onClickHandler}
            customButtonStyle={{ height: '40px', width: { xs: '100%', md: '40%' } }}
            color={Color.priWhite}
            backgroundColor={Color.priBlue}
            width={'40%'}
            fontSize={'14px'}
            hover={Color.textHint}
            text={!status ? 'Okay, I got it' : 'Verify now'}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ActivateServiceErrorComponent;
