/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ZoomPinch from '@/common/components/image-zoom.component';
import { ImagePreviewModal, ImagePreviewSrc } from '@/common/utils/global_state.util';

// import { Box } from '@mui/material';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function PreviewDialog() {
  const [imagePreview, setImagePreview] = ImagePreviewModal();

  const [imageSrc] = ImagePreviewSrc();

  const [scale, setScale] = React.useState<number>(1);
  const [active, setActive] = React.useState<boolean>(false);

  const handleClose = () => {
    setImagePreview(false);
    setActive(false);
    setScale(1);
  };

  return (
    <Dialog
      sx={(theme) => ({
        '& .MuiDialog-container': {
          width: 'auto',
          background: 'transparent',
        },
        '& .MuiDialog-paper': {
          minWidth: '200px',
          minHeight: '200px',
        },
        [theme.breakpoints.down('sm')]: {
          '& .MuiDialog-container': {
            width: '100%',
            height: '100%',
            margin: '0',
            background: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDialog-paper': {
            width: 'auto !important',
            height: 'auto',
            margin: '0',
            background: 'transparent',
            boxShadow: 'none !important',
          },
        },
        [theme.breakpoints.up('sm')]: {
          '& .MuiDialog-paper': {
            width: 'auto !important',
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            boxShadow: 'none',
            height: 'auto',
            margin: '0 auto',
            scale: `${scale} !important`,
          },
        },
      })}
      maxWidth='lg'
      fullWidth
      onClose={handleClose}
      open={imagePreview}
    >
      {/* <Box
        component='img'
        src={imageSrc}
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%' },
          '&:hover': { cursor: active ? 'grabbing' : 'grab' },
          overflow: 'hidden',
        }}
        onClick={handlerImageClick}
      /> */}
      <ZoomPinch cursorActive={active} onCursor={setActive} onClose={handleClose} srcFile={imageSrc} />
    </Dialog>
  );
}

export default function DialogImagePreview() {
  return (
    <div>
      <PreviewDialog />
    </div>
  );
}
