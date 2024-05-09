/* eslint-disable no-unused-vars */
import { isUndefined } from 'lodash';
import { Box } from '@mui/material';
import React from 'react';
import { useParams } from '@/router';
import CommunicationLayout from '@/common/layout/communication.layout';
import { Rooms } from './left-side';
import ConversationView from './right-side/conversation.view';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import { Text14 } from '@/common/styles';
import { Color } from '@/theme';
import { ReactComponent as NoChatSelectIcon } from '@/modules/communication/assets/no_conversation.svg';

const ChatRoomComponent = () => {
  const { chatRoomId } = useParams('/chat/:chatRoomId');
  const { xs, mdLg } = useMediaBreakpoint();
  return (
    <CommunicationLayout>
      <RenderIf value={mdLg || (xs && isUndefined(chatRoomId))}>
        <Box sx={{ width: xs ? '100%' : '392px', borderRight: `1px solid ${Color.EFEFEF}` }}>
          <Rooms />
        </Box>
      </RenderIf>
      <RenderIf value={isUndefined(chatRoomId) && mdLg}>
        <Box sx={{ width: '100%', display: 'flex', height: '100%', minHeight: '100%' }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
            }}
          >
            <NoChatSelectIcon />
            <Text14 sx={{ color: Color.textHint, marginTop: '16px' }}>No chat selected</Text14>
          </Box>
        </Box>
      </RenderIf>

      <RenderIf value={!isUndefined(chatRoomId)}>
        <Box sx={{ width: '100%', display: 'flex', height: '100%', minHeight: '100%' }}>
          <ConversationView />
        </Box>
      </RenderIf>
    </CommunicationLayout>
  );
};

export default ChatRoomComponent;
