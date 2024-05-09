import classNames from 'classnames/bind';
import { Button, styled, Typography } from '@mui/material';
import React from 'react';
import { Color } from '@/theme';
import { ReactComponent as AttachmentIcon } from '@/assets/icons/attachment_icon.svg';
import { fileDownloader } from '@/common/utils';

type Props = {
  fileUrl: string;
  variant?: 'normal' | 'filled';
  name?: string;
};

export const DownloadButton = styled(Button)({
  background: Color.lightBlue,
  color: Color.textBlack,
  border: `1px solid ${Color.priBlue}`,
  textTransform: 'capitalize',
  padding: '2px 8px',
  borderRadius: '5px',
  height: '24px',
  '&:hover': {
    background: Color.lightBlue,
    border: `1px solid ${Color.priBlue}`,
  },
  '&.normal': {
    background: `${Color.transparent}`,
    border: '0px',
  },
});

const FileAttachementView = ({ fileUrl, variant = 'filled', name }: Props) => {
  const fileName = !name ? fileUrl.split('/').pop()?.split('&').shift() : name;
  const _handleFileOpen = (): void => {
    if (fileUrl) {
      //const url = import.meta.env.VITE_API_SERVER_URL + fileUrl;
      fileDownloader(fileUrl, fileName as string);
    }
  };
  const klass = classNames({ normal: variant === 'normal', filled: variant === 'filled' });
  return (
    <DownloadButton className={klass} variant='outlined' title={fileUrl} onClick={_handleFileOpen}>
      <AttachmentIcon style={{ marginRight: '5px' }} />
      <Typography
        sx={{
          width: { xs: '90%', sm: 'auto', md: 'auto' },
          maxWidth: { sm: 'auto', md: 'auto' },
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          textAlign: 'left',
        }}
        component='span'
      >
        {fileName}
      </Typography>
    </DownloadButton>
  );
};
export default FileAttachementView;
