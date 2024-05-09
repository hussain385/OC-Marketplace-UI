/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { BoxContainer, RoomListCard } from '@/common/styles';
import { RoomHeaderView } from './rooms-header.view';
import './rooms-list.style.css';
import { SearchBoxComponent } from '@/common/components/search-box/search-box.component';
import { RoomListView } from './room.view';
import { selectAllChatRoomWithLatest, useGetChatListQuery } from '@/modules/communication/services';
import { useAppSelector } from '@/redux/hooks.tsx';
import moment from 'moment/moment';
import { Color } from '@/theme';

const EmptyRoomListView = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '305px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img style={{ maxWidth: '46px', width: '100%' }} src={'/message/message_no_company.png'} />
        <Typography sx={{ color: '#C4C4C4', fontSize: '14px', letterSpacing: '-0.5px', lineHeight: '16px' }}>
          Conversations will appear here.
        </Typography>
      </Box>
    </Box>
  );
};

export const Rooms = () => {
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [keyword, setKeyword] = useState<string | null>(null);
  const rooms = useAppSelector(selectAllChatRoomWithLatest);
  const filteredRoom = useMemo(() => {
    const roomsSorted = rooms.sort((a, b) =>
      moment(b.__latestMessage?.createdAt ?? b.latestMessageAt).diff(a.__latestMessage?.createdAt ?? a.latestMessageAt),
    );
    if (!keyword) {
      if (selectedFilter === 1) {
        return roomsSorted.filter((r) => (r?.__unreadCount ?? 0) > 0);
      } else if (selectedFilter === 2) {
        return roomsSorted.filter((r) => !((r?.__unreadCount ?? 0) > 0));
      } else if (selectedFilter === 3) {
        return roomsSorted.filter((r) => (r?.__mediaCount ?? 0) > 0);
      }
    }

    return roomsSorted.filter((chatRoom) => {
      const stringCollection = [
        ...new Set([
          chatRoom.uid,
          chatRoom.uid.toLowerCase(),
          chatRoom.uid.toUpperCase(),
          chatRoom.uid.toLocaleLowerCase(),
          chatRoom.uid.toLocaleUpperCase(),
          chatRoom.__latestMessage?.content?.toLocaleLowerCase(),
        ]),
      ];

      if (!stringCollection.every((string) => !string?.includes(keyword ?? ''))) {
        switch (selectedFilter) {
          case 0:
            return true;

          case 2: //read
            return (chatRoom.__unreadCount ?? 0) === 0;

          case 1: //unread
            return (chatRoom.__unreadCount ?? 0) > 0;

          case 3: //has file
            return (chatRoom.__mediaCount ?? 0) > 0;
        }
      }

      return false;
    });
  }, [keyword, rooms, selectedFilter]);
  useGetChatListQuery({
    params: {
      populate: [
        {
          path: '__latestMessage',
          populate: [
            {
              path: '__representative',
              populate: '__logo',
            },
            {
              path: '__sender',
              populate: '__logo',
            },
          ],
        },
        { path: '__representativeEntities', populate: '__logo' },
        // { path: '__mediaCount' },
      ],
    },
  });

  return (
    <BoxContainer sx={{ width: '100%' }}>
      <RoomHeaderView
        onDropdownItemClick={(item) => {
          switch (item.value) {
            case 'ALL':
              setSelectedFilter(0);
              break;
            case 'UNREAD':
              setSelectedFilter(1);
              break;
            case 'READ':
              setSelectedFilter(2);
              break;
            case 'HAS_FILE':
              setSelectedFilter(3);
              break;
          }
        }}
      />
      <Box
        sx={{
          paddingBottom: '15px',
        }}
      >
        <Box
          sx={{
            display: { xs: 'block', sm: 'block' },
            paddingLeft: { xs: '10px', sm: '36px' },
            paddingRight: { xs: '10px', sm: '16px' },
          }}
        >
          <SearchBoxComponent
            placeholder='Search messages'
            styleOverrides={{ borderRadius: '20px' }}
            onEnter={(e: string) => setKeyword(e)}
          />
        </Box>
        <Box sx={{ backgroundColor: `${Color.EFEFEF}`, height: '1px', width: '100%', marginTop: '16px' }}></Box>
        <Box sx={{ paddingLeft: '36px', paddingRight: '16px', paddingTop: '16px' }}>
          {filteredRoom && filteredRoom.length > 0 ? (
            filteredRoom?.map((room) => (
              <RoomListCard key={`chatroom-${room.uid}`}>
                <RoomListView room={room} />
              </RoomListCard>
            ))
          ) : (
            <EmptyRoomListView />
          )}
        </Box>
      </Box>
    </BoxContainer>
  );
};
