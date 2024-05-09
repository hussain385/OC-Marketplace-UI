import { Typography, Box, Button } from '@mui/material';
import React from 'react';

import {
  skipCustomButtonLabel,
  skipCustomCancelButton,
  skipCustomActionButton,
  skipCustomHeading,
  skipCustomSubHeading,
  skipCustomButtonWrapper,
  skipModalWrapper,
} from '../styles/skip-moda-styles';
import { useSkipForNow } from '../utils/global_state.util';
import PopupModalBox from './popup-modal-box';

const SkipForNowComponent = ({ onSkipAction }: { onSkipAction?: () => void }) => {
  const [, setSkip] = useSkipForNow();

  const cancelFunc = () => {
    setSkip(false);
  };
  return (
    <PopupModalBox childrenStyle={skipModalWrapper}>
      <Typography sx={skipCustomHeading}>Skip verifying your identity?</Typography>
      <Typography sx={skipCustomSubHeading}>
        You’ll have to finish verifying your identity later to access all services on OPNCORP
      </Typography>
      <Box sx={skipCustomButtonWrapper}>
        <Button onClick={cancelFunc} type='button' variant='contained' sx={skipCustomCancelButton}>
          <Typography sx={skipCustomButtonLabel}>
            {/* {formSubmitted ? 'Please Wait...' : 'Continue'} */}
            Cancel
          </Typography>
        </Button>
        <Button type='button' variant='contained' color='secondary' sx={skipCustomActionButton} onClick={onSkipAction}>
          <Typography sx={skipCustomButtonLabel}>Skip for now</Typography>
        </Button>
      </Box>
    </PopupModalBox>
  );
};

export default SkipForNowComponent;
