import { Dialog, DialogContent } from '@mui/material';
import React from 'react';

const DialogOrderMobile = ({
  children,
  isOpen,
  isClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  isClose: () => void;
}) => {
  return (
    <Dialog
      sx={(theme) => ({
        '& .MuiDialog-container': {
          width: '100%',
          margin: '0 auto',
          maxWidth: '35em',
          alignItems: 'flex-end',
          background: 'rgba(0, 0, 0, 0.5)',
        },
        [theme.breakpoints.down('sm')]: {
          '& .MuiDialog-paper': {
            width: '100%',
            margin: '0',
          },
        },
      })}
      open={isOpen}
      onClose={isClose}
      maxWidth='md'
      fullWidth={true}
    >
      <DialogContent sx={{ padding: { xs: '20px', sm: '24px', md: '24px' } }}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogOrderMobile;
