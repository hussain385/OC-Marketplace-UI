/* eslint-disable no-unused-vars */
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { NameLabel, Text12 } from '@/common/styles';
import { Color } from '@/theme';
import { fileDownloader, formatBytes, mediaUrlGenerator } from '@/common/utils';
import { ReactComponent as AttachmentIcon } from '@/assets/icons/attachment_icon.svg';
import { ReactComponent as DownloadIcon } from '../../../assets/ic-download.svg';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { ILogo } from '@/common/interface';

interface IProps {
  files: ILogo[] | [];
  isMyFiles: boolean;
}

const FilesMobileView = ({ files, isMyFiles }: IProps) => {
  const onDownloadHandle = (url: string, file: ILogo) => {
    fileDownloader(url, file.originalname as string);
  };

  const _fileRowRenderer = (file: ILogo): React.ReactNode => {
    const url = mediaUrlGenerator(file);
    return (
      <Box sx={{ marginY: '10px' }}>
        <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', paddingX: '20px' }}>
          <AttachmentIcon style={{ marginRight: '10px' }} />
          <Typography
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              textAlign: 'left',
              flex: 1,
            }}
            component='span'
          >
            {file.originalname}
          </Typography>
          <DownloadIcon onClick={() => onDownloadHandle(url, file)} />
        </Box>
        <Box
          sx={{ paddingX: '20px', paddingY: '10px', display: 'flex', flex: 1, borderBottom: `1px solid ${Color.borderGray2}` }}
        >
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Text12 sx={{ color: Color.textGray2 }}>{isMyFiles ? 'Uploaded by' : 'Shared by'}</Text12>
            {/*<Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>*/}
            {/*  <Box>*/}
            {/*    <NameOrPictureAvatar name={file.createdBy!.profile!.detail.name} url={url} />*/}
            {/*  </Box>*/}
            {/*  <Box sx={{ paddingX: '16px' }}>*/}
            {/*    <NameLabel>{file.createdBy!.profile!.detail.name}</NameLabel>*/}
            {/*  </Box>*/}
            {/*</Box>*/}
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Text12 sx={{ color: Color.textGray2 }}>Size</Text12>
            <Text12>{formatBytes(file.size)}</Text12>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Text12 sx={{ color: Color.textGray2 }}>Date</Text12>
            <Text12>{moment.utc(file.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY')}</Text12>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderFiles = () => {
    return files.map((file) => <Box key={file.id}>{_fileRowRenderer(file)}</Box>);
  };

  return <div>{renderFiles()}</div>;
};

export default FilesMobileView;
