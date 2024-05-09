/* eslint-disable no-unused-vars */
import { IMedia } from '@/common/interface';
import { IEntity } from '@/common/interface/entity-interface';
import { IService } from '@/common/interface/service-interface';

export enum SOCKET_EVENTS {
  ROOM_CAST = 'chatRoom:cast',
  MESSAGE_CAST = 'chatMessage:cast',
  MESSAGE_SEEN = 'chatMessage:seen',
  AUTHENTICATED = 'authenticated',
  USER_STATUS = 'user:status',
  CONNECT = 'connect',
  CONNECT_ERROR = 'connect_error',
  DISCONNECT = 'disconnect',
  CHATROOM_REFRESH = 'chatRoom:refresh',
}

export interface Message {
  replyToMessageId?: string | null;
  content?: string;
  serviceId?: string | null;
  mediaIds?: string[];
}

interface IUserPhoto {
  id?: number;
  name?: string;
  url?: string;
  width?: number;
  height?: number;
}

interface ISender {
  id: number;
  name: string;
  photo?: IUserPhoto;
}

interface IRoomLatestMessage {
  id: number;
  createdAt: string;
  message: string;
  messageType: string;
  sender: ISender;
}

export interface IRooms {
  id: number;
  isOnline: boolean;
  latestMessage: IRoomLatestMessage;
  service: IService;
  unread: number;
  media: IMedia[];
  creator: ISender;
}

export interface IChatRoom {
  uid: string;
  names?: string[];
  status?: 'ENABLE' | 'DISABLE';
  latestMessageAt?: string | null;
  willSendEmailAt?: string | null;
  updatedAt: string;
  members?: string[];
  relations?: Partial<{
    representativeEntityIds: Array<string>;
    mediaIds: Array<string>;
  }>;

  __representativeEntities?: string[];
  __latestMessage?: string;
  __unreadCount?: number;
  __medias?: Array<IMedia>;
  __mediaCount?: number;
}

export interface IChatMessage {
  uid: string;
  content?: string | null;
  status: 'ENABLE' | 'DISABLE';
  createdAt: string;
  updatedAt: string;
  createBy?: string;
  seenBy?: string[];
  relations?: Partial<{
    serviceId: string | null;
    roomId: string | null;
    replyToMessageId: string | null;
    mediaIds: Array<string>;
  }>;

  __service?: IService | null;
  __room?: IChatRoom;
  __replyToMessage?: IChatMessage | null;
  __medias?: Array<IMedia>;
  __sender?: string;
  __representative?: string;
}

export interface IChatUser {
  isOnline?: boolean;
  mainEntityId: string;
  subEntityId: string;
}
