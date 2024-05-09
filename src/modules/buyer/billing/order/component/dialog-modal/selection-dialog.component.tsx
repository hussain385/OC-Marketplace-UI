import { Dialog, DialogContent } from '@mui/material';
import React from 'react';

const NestedDialogMobileSelection = ({
  children,
  openModal,
  selectionIndex,
  isOpen,
  onCloseModal,
}: {
  children: React.ReactNode;
  openModal: number | null | HTMLElement;
  selectionIndex: number;
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  return (
    <div>
      {openModal === selectionIndex ? (
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
          onClose={onCloseModal}
          maxWidth='md'
          fullWidth={true}
        >
          <DialogContent sx={{ padding: { xs: '20px', sm: '24px', md: '24px' } }}>{children}</DialogContent>
        </Dialog>
      ) : (
        ''
      )}
    </div>
  );
};

export default NestedDialogMobileSelection;
