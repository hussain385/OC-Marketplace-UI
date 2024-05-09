// @flow
import React from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  disabled?: boolean;
  handleChangePic: () => void;
  handleDelete: () => void;
  isLoading?: boolean;
};

export const RemoveImageMenuComponent = ({
  anchorEl,
  open,
  handleClose,
  disabled,
  handleChangePic,
  handleDelete,
  isLoading,
}: Props) => {
  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      PaperProps={{
        style: {
          width: 160,
          borderRadius: 10,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        },
      }}
    >
      <MenuItem onClick={handleChangePic} disabled={disabled}>
        Change Image
      </MenuItem>
      <Divider />
      <MenuItem disabled={disabled} onClick={handleDelete}>
        {isLoading ? 'Loading' : 'Delete'}
      </MenuItem>
    </Menu>
  );
};
