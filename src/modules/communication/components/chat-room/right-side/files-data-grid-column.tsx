import moment from 'moment';
import { Box } from '@mui/material';
import { GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import React from 'react';
import FileAttachementView from './file-attachment.view';
import { fileDownloader, formatBytes, mediaUrlGenerator, sortComparator } from '@/common/utils';
import { ReactComponent as DownloadIcon } from '../../../assets/ic-download.svg';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { NameLabel } from '@/common/styles';
import { ILogo } from '@/common/interface';

const _sizeRender = (params: GridCellParams): string => {
  return formatBytes(params.row.size);
};

const _nameFieldRenderer = (params: GridCellParams): React.ReactNode => {
  const url = params.row.createdBy.__logo ? mediaUrlGenerator(params.row.createdBy.__logo) : '';
  return (
    <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
      <Box>
        <NameOrPictureAvatar name={params.row.createdBy!.profile!.detail.name} url={url} />
      </Box>
      <Box sx={{ paddingX: '16px' }}>
        <NameLabel>{params.row.createdBy!.profile!.detail.name}</NameLabel>
      </Box>
    </Box>
  );
};

const _fileFieldRenderer = (params: GridCellParams): React.ReactNode => {
  const url = mediaUrlGenerator(params.row);
  return (
    <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
      <FileAttachementView fileUrl={url} variant='normal' name={params.row.originalName} />
    </Box>
  );
};

const _timeFieldRenderer = (params: GridCellParams): string => {
  return moment.utc(params.row.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY');
};

const handleFileDownloader = (media: ILogo): React.ReactNode => {
  const url = mediaUrlGenerator(media);
  const fileName = url.split('/').pop()?.split('&').shift();
  return <DownloadIcon onClick={() => fileDownloader(url, fileName as string)} />;
};

export const FilesGridColumns = (isMyFile: boolean): GridColDef[] => {
  return [
    {
      field: 'filename',
      headerName: 'File name',
      width: 580,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.originalName,
      }),
      renderCell: (params: GridCellParams) => _fileFieldRenderer(params),
      sortComparator: sortComparator,
    },
    {
      field: 'sender',
      headerName: isMyFile ? 'Uploaded by' : 'Sent by',
      width: 250,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.createdBy!.profile.detail.name,
      }),
      renderCell: (params: GridCellParams) => _nameFieldRenderer(params),
      sortComparator: sortComparator,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.createdAt,
      }),
      renderCell: (params: GridCellParams) => _timeFieldRenderer(params),
      sortComparator: sortComparator,
    },
    {
      field: 'size',
      headerName: 'Size',
      width: 120,
      valueGetter: (params: GridValueGetterParams) => ({
        name: params.row.size,
      }),
      renderCell: (params: GridCellParams) => _sizeRender(params),
      sortComparator: sortComparator,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      renderCell: (params: GridCellParams) => handleFileDownloader(params.row),
    },
  ];
};
