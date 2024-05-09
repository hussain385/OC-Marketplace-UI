import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import { NameOrPictureAvatar } from '../name-avatar.component';
import { NameLabel, OfflineBadge, OnlineBadge, TextLabel, TimestampLabel } from '../../styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks.tsx';
import { selectAllChatRoomWithLatest } from '@/modules/communication/services';
import { IChatMessage, IChatRoom, IChatUser } from '@/modules/communication/interface';
import { IEntity } from '@/common/interface/entity-interface.ts';
import { mediaUrlGenerator } from '@/common/utils';
import { getTimeStamp } from '@/common/utils/helpers/timestamp.ts';

const NotificationItems = () => {
  const rooms = useAppSelector(selectAllChatRoomWithLatest);
  const selectedEntity = useAppSelector((state) => state.mainState.useInfo.selectedEntity);
  const entities = useAppSelector((state) => state.mainState.chat.entities);
  const members = useAppSelector((state) => state.mainState.chat.members);
  const navigate = useNavigate();
  const sortedRoom = useMemo(
    () =>
      rooms?.sort((a, b) =>
        moment(b.__latestMessage?.createdAt ?? b.latestMessageAt).diff(a.__latestMessage?.createdAt ?? a.latestMessageAt),
      ),
    [rooms],
  );

  const _generateItemList = useCallback(
    (chatRoom: IChatRoom & { __latestMessage?: IChatMessage | undefined }) => {
      const { __latestMessage, __representativeEntities } = chatRoom;
      const entity: IEntity | undefined = entities[__representativeEntities?.find((r) => r !== selectedEntity?.uid) ?? ''];
      const entityName = entity?.profile.detail.name;
      const profilePicture = entity?.__logo ? mediaUrlGenerator(entity.__logo) : undefined;
      const member: IChatUser | undefined = members[chatRoom.__latestMessage?.createBy ?? ''];
      const unreadCount = chatRoom?.__unreadCount ?? 0;

      return (
        <Box key={chatRoom.uid} sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box sx={{ position: 'relative' }}>
            <NameOrPictureAvatar name={entityName} url={profilePicture} />
            {member?.isOnline ? (
              <OnlineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' />
            ) : (
              <OfflineBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot' />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flex: '1',
              justifyContent: 'space-between',
              marginLeft: '8px',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <NameLabel sx={{ fontSize: '14px', fontWeight: 700 }}>{entityName}</NameLabel>
                <TimestampLabel
                  sx={{
                    fontSize: '10px',
                    fontWeight: 700,
                  }}
                >
                  {getTimeStamp(__latestMessage?.createdAt)}
                </TimestampLabel>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '2px' }}>
                <TextLabel
                  sx={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: unreadCount > 0 ? 700 : 400,
                    width: '250px',
                    color: unreadCount > 0 ? '#000' : '#7A7A7A',
                  }}
                  noWrap={true}
                  dangerouslySetInnerHTML={{ __html: __latestMessage?.content as string }}
                />
                {unreadCount > 0 && (
                  <Box
                    sx={{
                      background: '#FF6A68',
                      borderRadius: '4px',
                      width: '18px',
                      height: '15px',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: '8px', color: 'white' }}>{chatRoom.__unreadCount}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      );
    },
    [entities, members, selectedEntity?.uid],
  );

  const _renderMenuItem = (): React.ReactNode => {
    return rooms && rooms.length > 0 ? (
      sortedRoom.map((chatRoom, index) => {
        return (
          <MenuItem
            key={chatRoom.uid}
            sx={{
              paddingX: '16px',
              marginY: '0px',
              height: '76px',
              ':hover': {
                backgroundColor: '#EFF7FF',
              },
            }}
            onClick={() => _onItemClickHandle(chatRoom.uid)}
          >
            {_generateItemList(chatRoom)}
          </MenuItem>
        );
      })
    ) : (
      <MenuItem sx={{ display: 'block', textAlign: 'center' }}>
        <Typography>No message</Typography>
      </MenuItem>
    );
  };

  const _onItemClickHandle = (id: string) => {
    navigate(`/chat/${id}`);
  };
  return <>{_renderMenuItem()}</>;
};

export default NotificationItems;
