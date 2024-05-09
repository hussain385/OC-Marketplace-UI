import { IconButton, Typography, Box } from '@mui/material';

import React from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { RemoveButton } from './team-management.style';

type Props = {
  content: string;
  isOpen: boolean;
  onClose?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  isRemoveButton?: boolean;
};

export default function RemoveInfoBar(props: Props) {
  const onCloseHandle = (): void => {
    props.onClose && props.onClose();
  };

  return props.isOpen ? (
    <Box
      sx={{
        position: 'fixed',
        backgroundColor: 'white',
        padding: '0px 15px',
        zIndex: 99,
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.12)',
        borderRadius: '8px',
        bottom: '5%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '46px' }}>
        <Typography>{props.content}</Typography>
        {props.isRemoveButton ? (
          <RemoveButton disabled={props.disabled} sx={{ marginLeft: '10px' }} onClick={props.onRemove}>
            Remove
          </RemoveButton>
        ) : null}
        <IconButton
          onClick={() => {
            onCloseHandle();
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  ) : null;
}
