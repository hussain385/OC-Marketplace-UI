import { baseApi } from '@/redux/baseAPI.ts';
import { IChatMessage, IChatRoom, Message } from '../interface';
import { IQueryGlobal } from '@/common/interface';

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChatRoomFromService: builder.mutation<{ newChatRoom: IChatRoom }, { serviceId: string; body?: Message }>({
      query: ({ serviceId, body }) => ({
        url: `communication/chat-rooms/from-service/${serviceId}`,
        method: 'POST',
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
          ],
        },
        body: !body
          ? undefined
          : {
              relatedData: {
                messages: [body],
              },
            },
      }),
      transformResponse: (response: { data: never }) => response?.data,
    }),
    sendChatMessage: builder.mutation<IChatMessage, { chatRoomId: string; message: Message; extraPopulate?: string[] }>({
      query: ({ chatRoomId, message, extraPopulate }) => ({
        url: 'communication/chat-messages',
        method: 'POST',
        body: {
          roomId: chatRoomId,
          data: message,
        },
        params: {
          populate: ['__representative', '__medias'].concat(extraPopulate ?? []),
        },
      }),
      transformResponse: (response: { data: { newMessage: IChatMessage } }) => response?.data?.newMessage,
    }),
    getUnreadChat: builder.query<{ chatRooms: IChatRoom[] }, { params?: IQueryGlobal }>({
      query: ({ params }) => ({
        url: 'communication/chat-rooms/unread',
        params,
      }),
      transformResponse: (response: { data: never }) => response?.data,
    }),
    getMediaList: builder.query<void, { params?: IQueryGlobal }>({
      query: ({ params }) => ({
        url: 'communication/chat-rooms/has-medias',
        params,
      }),
    }),
    getChatList: builder.query<{ chatRooms: IChatRoom[] }, { params?: IQueryGlobal }>({
      query: ({ params }) => ({
        url: 'communication/chat-rooms',
        params,
      }),
      transformResponse: (response: { data: never }) => response?.data,
    }),
    getChatMessages: builder.query<
      { chatMessages: IChatMessage[] },
      {
        conversationId: string;
        params?: IQueryGlobal;
      }
    >({
      query: ({ conversationId, params }) => ({
        url: `communication/chat-messages/belongs-to/${conversationId}`,
        params,
      }),
      transformResponse: (response: { data: never }) => response?.data,
    }),
    seenMessage: builder.mutation<void, { messageId: string }>({
      query: ({ messageId }) => ({
        url: `communication/chat-messages/seen/${messageId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useCreateChatRoomFromServiceMutation,
  useGetUnreadChatQuery,
  useGetChatListQuery,
  useGetChatMessagesQuery,
  useSeenMessageMutation,
  useSendChatMessageMutation,
} = chatApi;
