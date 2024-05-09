/* eslint-disable no-unused-vars */
import { isUndefined } from 'lodash';
import moment from 'moment';
import { Box, Chip, Divider, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import UserMessageBubbleView from './user-message-bubble.view';
import { useAppSelector } from '@/redux/hooks';

import 'react-quill/dist/quill.snow.css';

import '@/common/components/quill/quill.overrides.css';

import '@/modules/communication/styles/chat.style.css';

import QuillEditorComponent from '@/common/components/quill/editor.component';
import {
  selectConversation,
  useGetChatMessagesQuery,
  useSeenMessageMutation,
  useSendChatMessageMutation,
} from '@/modules/communication/services';
import { useParams } from 'react-router-dom';
import { useUploadMediaMutation } from '@/redux/apis/mediaApi.ts';
import ConversationHeaderView from '@/modules/communication/components/chat-room/right-side/header.view.tsx';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import FilesView from '@/modules/communication/components/chat-room/right-side/files.view.tsx';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

const ConversationView = () => {
  const { user, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const entities = useAppSelector((state) => state.mainState.chat.entities);
  const [tabIndex, setTabIndex] = useState(0);
  const { chatRoomId } = useParams();
  const { messages, room } = useAppSelector((state) => selectConversation(state, chatRoomId ?? ''));
  const individual = useMemo(() => user?.roles.find((r) => r?.entityType?.includes(companyProfiles.individual)), []);
  const unSeenMessageId = useMemo(
    () => messages.filter((message) => !message.seenBy?.includes(individual?.entityId ?? '')),
    [individual?.entityId, messages],
  );
  const bottomRef = useRef<HTMLElement>(null);
  const { xs } = useMediaBreakpoint();
  const [SendMessage] = useSendChatMessageMutation();
  const [SeenMessage, { isLoading: isSeenLoading }] = useSeenMessageMutation();
  const [UploadFile] = useUploadMediaMutation();
  useGetChatMessagesQuery({
    conversationId: chatRoomId ?? '',
    params: {
      populate: [
        {
          path: '__representative',
          populate: '__logo',
        },
        {
          path: '__sender',
          populate: '__logo',
        },
        { path: '__medias' },
        { path: '__service', populate: '__medias' },
      ],
    },
  });

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;

      const lastSeen = unSeenMessageId.pop();

      if (!isSeenLoading && !!lastSeen) {
        SeenMessage({ messageId: lastSeen.uid });
      }
    }
  }, [SeenMessage, isSeenLoading, unSeenMessageId]);

  const _renderChatMessages = () => {
    const dates: string[] = [];
    !isUndefined(messages) &&
      messages.length > 0 &&
      messages.map((message, i: number) => {
        const year = moment(message.createdAt).format('YYYY');
        const messageDate =
          moment().format('YYYY') === year
            ? moment(message.createdAt).format('dddd DD MMM')
            : moment(message.createdAt).format('dddd DD MMM, YYYY');

        if (!dates.includes(messageDate)) {
          dates.push(messageDate);
        }
      });

    return dates.map((date, index) => {
      const senderIds: any = {};
      return (
        <div key={index}>
          <Divider sx={{ marginY: '36px' }}>
            <Chip label={date} sx={{ backgroundColor: '#F6F6F6', color: '#7A7A7A' }} />
          </Divider>
          {!isUndefined(messages) && messages.length > 0
            ? messages.map((message, i) => {
                const year = moment(message.createdAt).format('YYYY');
                const msgDate =
                  moment().format('YYYY') === year
                    ? moment(message.createdAt).format('dddd DD MMM')
                    : moment(message.createdAt).format('dddd DD MMM, YYYY');
                if (date === msgDate) {
                  if (!senderIds[message!.createBy as string]) {
                    senderIds[message!.createBy!] = 1;
                  } else {
                    senderIds[message!.createBy!] = senderIds[message!.createBy!] + 1;
                  }
                  const showAvatar =
                    !isUndefined(messages[i + 1]) && message.createBy !== messages[i + 1].createBy ? true : false;

                  const bubbleMessage = (
                    <UserMessageBubbleView
                      key={message.uid}
                      data={message}
                      salesEntity={entities[message.__sender ?? '']}
                      isMe={user!.roles.some((r) => r.entityId === message!.createBy)}
                      shouldShowSenderName={senderIds[message!.createBy!] === 1}
                      showAvatar={showAvatar}
                    />
                  );

                  if (!isUndefined(messages[i + 1])) {
                    if (message!.createBy !== messages[i + 1].createBy) {
                      senderIds[message!.createBy!] = 0;
                    }
                  }
                  return bubbleMessage;
                }
              })
            : null}
        </div>
      );
    });
  };

  const onSendButtonHandle = useCallback(
    async (params: { content: string; files?: File[] }) => {
      if (!chatRoomId) {
        return;
      }
      //upload file first
      const data: any = {
        content: params.content,
        mediaIds: [],
      };
      const formData = new FormData();
      formData.append('type', 'CHAT_ROOMS');
      formData.append('resourceId', chatRoomId);
      if (params.files && params.files.length > 0) {
        const files = Array.from(params.files);
        const uploadFilesResult = await Promise.all(
          files.map((file) => {
            const fileFormData = new FormData();
            fileFormData.append('type', 'CHAT_ROOMS');
            fileFormData.append('media', file);
            fileFormData.append('resourceId', chatRoomId);
            return UploadFile({ data: fileFormData }).unwrap();
          }),
        );
        const uploadedFiles = uploadFilesResult.map((result) => result.data.newMedia);
        data.mediaIds = uploadedFiles.map((media) => media.uid);
      }

      SendMessage({ chatRoomId, message: data });
    },
    [SendMessage, UploadFile, chatRoomId],
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingInline: xs ? '0px' : '56px',
        paddingBottom: xs ? '0px' : '48px',
        paddingTop: xs ? '0px' : '24px',
      }}
    >
      <ConversationHeaderView
        entity={entities[room?.__representativeEntities?.find((e) => e !== selectedEntity?.uid) ?? '']}
        tabIndex={tabIndex}
        onChange={(_, value) => setTabIndex(value)}
      />

      <RenderIf value={tabIndex === 0}>
        <Box ref={bottomRef} sx={{ overflowY: 'scroll', height: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: { xs: '50px' } }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Start of conversation</Typography>
            <Typography sx={{ fontSize: '10px', fontWeight: 600, color: '#7A7A7A' }}>
              Message sent with history on are saved
            </Typography>
          </Box>
          {_renderChatMessages()}
        </Box>

        <Box sx={{ width: '100%' }}>
          <QuillEditorComponent
            onSendButton={(e) => {
              onSendButtonHandle({ files: e.attachment, content: e.root.innerHTML }); //send new message
              e.setText(''); //clear text after sending message
              e.attachment = undefined; //clear attachments after sending message
            }}
          />
        </Box>
      </RenderIf>

      <RenderIf value={tabIndex === 1}>
        <Box sx={{ overflowY: 'scroll', height: '100%' }}>
          <FilesView />
        </Box>
      </RenderIf>
    </Box>
  );
};
export default ConversationView;
