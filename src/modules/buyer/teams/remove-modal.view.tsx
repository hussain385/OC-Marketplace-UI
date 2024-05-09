import { Box, Dialog, DialogContent } from '@mui/material';

import React from 'react';

import { PrimaryRedButton, SecondryButton } from '../../../common/styles/index';

type Props = {
  content: string | React.ReactNode | JSX.Element;
  isOpen: boolean;
  onClose?: () => void;
  onOk?: () => void;
  closeBtnLabel?: string;
};

export default function RemoveModal(props: Props) {
  const onCloseHandle = () => {
    props.onClose && props.onClose();
  };

  const onOkHandle = () => {
    props.onOk && props.onOk();
  };

  return (
    <Dialog open={props.isOpen} onClose={onCloseHandle} maxWidth='sm' fullWidth={true}>
      <DialogContent sx={{ padding: '24px' }}>
        <Box sx={{ padding: '10px' }}>{props.content}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SecondryButton sx={{ flex: 1, marginRight: '5px' }} onClick={onCloseHandle}>
            Cancel
          </SecondryButton>
          <PrimaryRedButton sx={{ flex: 1, marginLeft: '5px' }} onClick={onOkHandle}>
            Remove
          </PrimaryRedButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
