import moment from 'moment';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Box } from '@mui/material';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { NameLabel, OfflineBadge, OnlineBadge, TextLabel, TimestampLabel } from '@/common/styles';
import { mediaUrlGenerator, truncate } from '@/common/utils';
import { IChatMessage, IChatRoom } from '@/modules/communication/interface';
import { useAppSelector } from '@/redux/hooks.tsx';
import { selectEntityById } from '@/modules/communication/services';
import { Color } from '@/theme';
import { RenderIf } from '@/common/components';

type Props = {
  room: IChatRoom & { __latestMessage?: IChatMessage };
  onRoomClick?: (id: string) => void;
};

export const RoomListView = ({ room, onRoomClick }: Props) => {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  const members = useAppSelector((state) => state.mainState.chat.members);
  const selectedEntity = useAppSelector((state) => state.mainState.useInfo.selectedEntity);
  const representativeEntity = useAppSelector((state) =>
    selectEntityById(state, room.__representativeEntities?.find((r) => r !== selectedEntity?.uid) ?? ''),
  );
  const profilePicUrl = useMemo(
    () => (representativeEntity?.__logo ? mediaUrlGenerator(representativeEntity?.__logo) : undefined),
    [representativeEntity?.__logo],
  );
  const cssClass = useMemo(() => classNames('room-card', { active: chatRoomId === room.uid }), [chatRoomId, room.uid]);

  const onRoomClickHadnle = (id: string) => {
    onRoomClick && onRoomClick(id);
    navigate(`/chat/${id}`, { replace: true });
  };

  const renderTimeStamp = () => {
    const now = moment();
    const messageDate = moment(room.__latestMessage?.updatedAt ?? room.latestMessageAt);
    const format = messageDate.year === now.year ? 'DD/MM' : 'DD/MM/YYYY';
    if (now.diff(messageDate, 'days') < 1) {
      return moment(room.__latestMessage?.createdAt ?? room.latestMessageAt).fromNow();
    } else {
      return moment(room.__latestMessage?.createdAt ?? room.latestMessageAt).format(format);
    }
  };

  return (
    <Box>
      <div onClick={() => onRoomClickHadnle(room.uid)}>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            overflow: { sm: 'auto', md: 'hidden' },
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          className={cssClass}
        >
          <Box sx={{ position: 'relative' }}>
            <NameOrPictureAvatar name={representativeEntity?.profile.detail.name} url={profilePicUrl} />
            {/** change status condition it should be user online status */}
            {Object.values(members).find((m) => m.mainEntityId === representativeEntity?.uid)?.isOnline ? (
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
              marginLeft: '16px',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  overflow: 'auto',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flexDirection: 'column',
                }}
              >
                <NameLabel
                  sx={{
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                >
                  {truncate(representativeEntity?.profile?.detail.name as string, 20)}
                </NameLabel>
                <TextLabel sx={{ display: 'block', fontSize: '12px', fontWeight: (room?.__unreadCount ?? 0) > 0 ? 700 : 400 }}>
                  {room.__latestMessage?.content
                    ? truncate(room.__latestMessage?.content as string, 30).replace(/<\/?[^>]+(>|$)/g, '')
                    : null}
                </TextLabel>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  justifyContent: 'space-between',
                }}
              >
                <TimestampLabel>{renderTimeStamp()}</TimestampLabel>
                <RenderIf value={room.__unreadCount! > 0}>
                  <Box
                    sx={{
                      borderRadius: '4px',
                      background: Color.lightRed,
                      color: Color.priWhite,
                      width: '18px',
                      height: '15px',
                      fontSize: '10px',
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    {room.__unreadCount}
                  </Box>
                </RenderIf>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
