import React from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import { AppThemeBtnComponent } from '../../../common/components/app-theme-btn.component';
import { Color } from '../../../theme';

type componentProps = {
  open: boolean;
  onCloseHandle: () => void;
  onSwitchHandle: () => void;
  onAddRequirementHandle: () => void;
};

const EmptyRequirementSubmitComponent = ({ open, onCloseHandle, onSwitchHandle, onAddRequirementHandle }: componentProps) => {
  return (
    <Dialog open={open} onClose={onCloseHandle} maxWidth={'sm'} fullWidth={true}>
      <DialogContent sx={{ padding: '24px', display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        <img src={require('../../../assets/icons/warning-img.png').default} style={{ width: '72px', height: '72px' }} />
        <Typography sx={{ fontSize: '20px', fontWeight: '700', marginTop: '1em', textAlign: 'center' }}>
          {"You must add a requirement after selecting 'Yes'. Switch to no requirement instead?"}
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
            type='button'
            onClick={onAddRequirementHandle}
            customButtonStyle={{ height: '40px', width: { xs: '100%', md: '40%' } }}
            color={Color.priBlue}
            backgroundColor={'#eeeeee'}
            width={'40%'}
            fontSize={'14px'}
            text={'Add a requirement'}
            hover={'rgba(102,209,158,0.15)'}
          />
          <AppThemeBtnComponent
            onClick={onSwitchHandle}
            customButtonStyle={{ height: '40px', width: { xs: '100%', md: '40%' } }}
            color={Color.priWhite}
            backgroundColor={Color.priBlue}
            width={'40%'}
            fontSize={'14px'}
            hover={Color.textHint}
            text={"Switch to 'NO'"}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmptyRequirementSubmitComponent;
