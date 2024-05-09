/* eslint-disable no-unused-vars */
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { DataGrid } from '@mui/x-data-grid';
import { useGetMediasQuery } from '@/redux/apis/mediaApi.ts';
import { useParams } from '@/router.ts';
import Pagination from '@/common/components/pagination.tsx';
import { Box, CircularProgress, Stack, Tabs, Typography } from '@mui/material';
import { Color, gridStyles } from '@/theme.ts';
import { FilesGridColumns } from './files-data-grid-column';
import { StyledTab, Text14 } from '@/common/styles';
import { useAppSelector } from '@/redux/hooks';
import { selectConversation } from '@/modules/communication/services';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import FilesMobileView from './files.mobile.view';
import { ILogo } from '@/common/interface';

function FilesView() {
  const { chatRoomId } = useParams('/chat/:chatRoomId');
  const { messages } = useAppSelector((state) => selectConversation(state, chatRoomId ?? ''));
  const entities = useAppSelector((state) => state.mainState.chat.entities);
  const { selectedRole, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const { xs } = useMediaBreakpoint();

  const [{ page, tabIndex, myFiles, sharedFiles, isSorted, isMyFiles }, setState] = useSetState({
    page: 1,
    tabIndex: 0,
    isSorted: false,
    myFiles: [] as ILogo[],
    sharedFiles: [] as ILogo[],
    isMyFiles: true,
  });
  const { data: medias, isLoading } = useGetMediasQuery({
    filter: {
      container: {
        $regex: `chat-rooms/${chatRoomId}`,
        $options: 'i',
      },
    },
  });

  useEffect(() => {
    if (!isLoading && !isEmpty(medias) && !isSorted) {
      const myFiles: ILogo[] = [];
      const sharedFiles: ILogo[] = [];
      messages.map((message) => {
        if (message.createBy === selectedRole?.entityId) {
          message.relations?.mediaIds?.map((id) => {
            medias?.forEach((item) => {
              if (id === item.uid) {
                myFiles.push({ ...item });
              }
            });
          });
        } else {
          message.relations?.mediaIds?.map((id) => {
            medias?.forEach((item) => {
              if (id === item.uid) {
                const senderEntity = entities[message.createBy!];
                sharedFiles.push({ ...item });
              }
            });
          });
        }
      });
      setState({ myFiles: myFiles, sharedFiles: sharedFiles, isSorted: true });
    }
  }, [isLoading, medias, messages, sharedFiles, setState, myFiles, selectedRole?.entityId, isSorted, selectedEntity, entities]);

  const NoResult = () => {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <Text14 sx={{ color: Color.textHint, marginTop: '8px' }}>No media found</Text14>
      </Stack>
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <CircularProgress sx={{ color: Color.priBlue, fontWeight: 400 }} size={60} />
      </Box>
    );
  }

  if (!medias || medias.length === 0) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', height: '100%' }}>
        <Typography variant={'h5'}>No media found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingY: '20px' }}>
      <Box sx={{ paddingBottom: '20px' }}>
        <Tabs
          value={tabIndex}
          onChange={(_, value) => {
            if (value === 0) {
              setState({ isMyFiles: true });
            } else {
              setState({ isMyFiles: false });
            }
            setState({ tabIndex: value });
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: Color.priWhite,
              height: '0px',
            },
          }}
        >
          <StyledTab
            sx={{
              px: '40px',
              py: '16px',
              textTransform: 'initial',
              fontSize: '14px !important',
              letterSpacing: { xs: '-1.12px', sm: 0, md: 0, lg: 0 },
            }}
            label={`My files (${myFiles.length})`}
          />
          <StyledTab
            sx={{
              px: '40px',
              py: '16px',
              textTransform: 'initial',
              fontSize: '14px !important',
              letterSpacing: { xs: '-1.12px', sm: 0, md: 0, lg: 0 },
            }}
            label={`Shared with  me (${sharedFiles.length})`}
          />
        </Tabs>
      </Box>
      {!isEmpty(medias) ? (
        <>
          <RenderIf value={!xs}>
            <DataGrid
              loading={isLoading}
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
              rowHeight={60}
              rows={tabIndex === 0 ? myFiles : sharedFiles}
              autoHeight={medias && !isEmpty(medias)}
              sortingOrder={['desc', 'asc']}
              columns={FilesGridColumns(isMyFiles)}
              sx={{ ...gridStyles, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
              components={{ NoRowsOverlay: NoResult, Footer: () => null }}
            />
          </RenderIf>
          <RenderIf value={xs}>
            <FilesMobileView files={tabIndex === 0 ? myFiles : sharedFiles} isMyFiles />
          </RenderIf>
        </>
      ) : (
        'No media found'
      )}

      <Box sx={{ display: 'none', flex: '1', justifyContent: 'end', paddingY: '10px' }}>
        <Pagination
          listSx={{
            marginTop: '16px',
          }}
          options={{
            count: Math.ceil((medias?.length ?? 1) / 15),
            page: page,
            onChange: (_, page1) => setState({ page: page1 }),
          }}
        />
      </Box>
    </Box>
  );
}

export default FilesView;
