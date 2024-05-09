import { createDraftSafeSelector, createSelector, createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { IChatMessage, IChatRoom, IChatUser } from '@/modules/communication/interface';
import { chatApi } from '@/modules/communication/services/chat.api.ts';
import { clearAllStateAction } from '@/redux/actions.ts';
import { RootState } from '@/redux/store.tsx';
import { normalize, schema } from 'normalizr';
import { IEntity } from '@/common/interface/entity-interface.ts';
import moment from 'moment/moment';

/*
 *******************************
 *   Normalize Entity Section
 *******************************
 */

const memberEntity = new schema.Entity('members', {}, { idAttribute: 'subEntityId' });

const entityEntity = new schema.Entity('entities', {}, { idAttribute: 'uid' });

const messageEntity = new schema.Entity(
  'messages',
  {
    createBy: memberEntity,
    seenBy: [memberEntity],
    __sender: entityEntity,
    __representative: entityEntity,
  },
  { idAttribute: 'uid' },
);

const chatEntity = new schema.Entity(
  'rooms',
  {
    __latestMessage: messageEntity,
    members: [memberEntity],
    __representativeEntities: [entityEntity],
  },
  { idAttribute: 'uid' },
);

/*
 *****************************
 *   Redux Slice Section
 *****************************
 */

interface InitialState {
  rooms: { [key: string]: IChatRoom };
  messages: { [key: string]: IChatMessage };
  members: { [key: string]: IChatUser };
  entities: { [key: string]: IEntity };
}

const initialState: InitialState = {
  rooms: {},
  messages: {},
  members: {},
  entities: {},
};

function assignState(state: any, norm: { entities: Partial<InitialState> }) {
  state.rooms = Object.assign(state.rooms, norm.entities.rooms);
  state.messages = Object.assign(state.messages, norm.entities.messages);
  state.entities = Object.assign(state.entities, norm.entities.entities);
  state.members = Object.assign(state.members, norm.entities.members);
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChat: () => initialState,
    addOrUpdateChatRoom: (state, action: PayloadAction<IChatRoom>) => {
      const norm: { entities: Partial<InitialState> } = normalize(action.payload, chatEntity);
      assignState(state, norm);
    },
    upsertMessage: (state, action: PayloadAction<{ chatMessage: IChatMessage; entityId: string }>) => {
      const norm: { entities: Partial<InitialState> } = normalize(action.payload.chatMessage, messageEntity);
      const message = norm.entities.messages?.[action.payload.chatMessage.uid];
      const entityId = action.payload.entityId;
      const room = state.rooms[message?.relations?.roomId ?? ''];

      if (message && room) {
        if (message.createBy === entityId) {
          room.__unreadCount = 0;
        } else if (!message.seenBy?.includes(entityId) && !state.messages[message.uid]) {
          room.__unreadCount = (room.__unreadCount ?? 0) + 1;
        }

        room.__latestMessage = message.uid;
      }

      assignState(state, norm);
    },
    upsertManyMessage: (state, action: PayloadAction<IChatMessage[]>) => {
      const norm: { entities: Partial<InitialState> } = normalize(action.payload, [messageEntity]);
      assignState(state, norm);
    },
    updateChatUser: (state, action: PayloadAction<IChatUser>) => {
      const norm: { entities: Partial<InitialState> } = normalize(action.payload, memberEntity);
      state.members = Object.assign(state.members, norm.entities.members);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearAllStateAction, () => initialState);

    builder.addMatcher(
      isAnyOf(chatApi.endpoints.getChatList.matchFulfilled, chatApi.endpoints.getUnreadChat.matchFulfilled),
      (state, action) => {
        const rooms = action.payload?.chatRooms;
        if (!rooms || rooms.length === 0) return;

        const norm: { entities: InitialState } = normalize(rooms, [chatEntity]);
        assignState(state, norm);
      },
    );

    builder
      .addMatcher(chatApi.endpoints.getChatMessages.matchFulfilled, (state, action) => {
        const messages = action.payload?.chatMessages;
        if (!messages || messages.length === 0) return;

        const norm: { entities: Partial<InitialState> } = normalize(messages, [messageEntity]);
        assignState(state, norm);
      })
      .addMatcher(chatApi.endpoints.seenMessage.matchFulfilled, (state, action) => {
        const message = state.messages[action.meta.arg.originalArgs.messageId];

        if (message) {
          const room = state.rooms[message.relations?.roomId ?? ''];

          if (room) {
            room.__unreadCount = 0;
          }
        }
      });
    // .addMatcher(chatApi.endpoints.sendChatMessage.matchFulfilled, (state, action) => {
    //   const message = action.payload;
    //   const roomId = message.relations?.roomId;
    //
    //   if (roomId) {
    //     state.rooms[roomId].__latestMessage = message.uid;
    //     state.rooms[roomId].__unreadCount = 0;
    //   }
    // });
  },
});

export const { addOrUpdateChatRoom, resetChat, updateChatUser, upsertMessage } = chatSlice.actions;

/*
 *****************************
 *   Custom Select Section
 *****************************
 */

export const {
  selectAllChatRoom,
  selectAllChatRoomWithLatest,
  selectAllChatMessages,
  selectRoomById,
  selectMessageById,
  selectEntityById,
  selectAllChatEntities,
} = {
  selectAllChatRoom: createDraftSafeSelector([(state: RootState) => state.mainState.chat.rooms], (rooms) => Object.values(rooms)),
  selectAllChatRoomWithLatest: createDraftSafeSelector(
    [(state: RootState) => state.mainState.chat.rooms, (state: RootState) => state.mainState.chat.messages],
    (rooms, messages) =>
      Object.values(rooms).map((r) => ({
        ...r,
        __latestMessage: messages[r.__latestMessage ?? ''],
      })) as (IChatRoom & { __latestMessage?: IChatMessage })[],
  ),
  selectAllChatMessages: createDraftSafeSelector([(state: RootState) => state.mainState.chat.messages], (messages) =>
    Object.values(messages),
  ),
  selectAllChatEntities: createDraftSafeSelector([(state: RootState) => state.mainState.chat.entities], (entities) =>
    Object.values(entities),
  ),
  selectRoomById: createDraftSafeSelector(
    [(state: RootState) => state.mainState.chat.rooms, (_: unknown, roomId: string) => roomId],
    (rooms, roomId) => rooms[roomId] as IChatRoom | undefined,
  ),
  selectMessageById: createDraftSafeSelector(
    [(state: RootState) => state.mainState.chat.messages, (_: unknown, messageId: string) => messageId],
    (messages, messageId) => messages[messageId] as IChatMessage | undefined,
  ),
  selectEntityById: createSelector(
    [(state: RootState) => state.mainState.chat.entities, (_: unknown, entityId: string) => entityId],
    (entities, entityId) => entities[entityId] as IEntity | undefined,
  ),
};

export const selectUnreadChat = createDraftSafeSelector(
  [selectAllChatRoom, (state: RootState) => state.mainState.chat.messages],
  (chats, messages) =>
    chats
      ?.filter((c) => c.__unreadCount && c.__unreadCount > 0)
      .map((c) => ({
        ...c,
        __latestMessage: c?.__latestMessage ? messages[c.__latestMessage] : undefined,
      })) as (IChatRoom & { __latestMessage?: IChatMessage })[] | undefined,
);

export const selectMessagesByRoom = createDraftSafeSelector(
  [selectAllChatMessages, (_: unknown, roomId: string) => roomId],
  (messages, roomId) =>
    messages.filter((m) => m.relations?.roomId === roomId).sort((a, b) => moment(a.createdAt).diff(b.createdAt)),
);

export const selectConversation = createDraftSafeSelector(
  [
    (_: unknown, roomId: string) => roomId,
    (state, roomId) => selectRoomById(state, roomId),
    (state, roomId) => selectMessagesByRoom(state, roomId),
    (state: RootState) => state.mainState.chat.members,
  ],
  (_, room, messages, members) => ({
    room,
    messages,
    members: room?.members?.map((m) => members[m]),
  }),
);

export default chatSlice.reducer;
