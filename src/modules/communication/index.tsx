/* eslint-disable no-console */
import { isEmpty, isUndefined } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { IChatMessage, IChatRoom, IChatUser, SOCKET_EVENTS } from './interface';
import { SocketIOManager } from './socket-io';
import { addOrUpdateChatRoom, updateChatUser, upsertMessage } from '@/modules/communication/services';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

export const socketManager: SocketIOManager = SocketIOManager.getInstance();

/**
 * @name Communication
 * @description This socket wrapper component only deals to connect socket and receive socket broadcast and update redux
 */
const Communication = () => {
  const dispatch = useAppDispatch();
  const { user, token, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const [isConncted, setIsConnected] = useState(false);
  const individual = useMemo(() => user?.roles.find((r) => r.entityType?.includes(companyProfiles.individual)), [user?.roles]);

  const connectToSocket = useCallback(() => {
    socketManager.initialize(token!, selectedEntity!.uid);
    socketManager.socket.connect();
  }, [token, selectedEntity]);

  const initializeCallbacks = useCallback(() => {
    socketManager.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log(SOCKET_EVENTS.CONNECT, socketManager.socket.connected, socketManager.socket.id);
    });

    socketManager.socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(SOCKET_EVENTS.DISCONNECT, socketManager.socket.disconnected, socketManager.socket.id);
      setIsConnected(false);
    });

    socketManager.socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
      console.log(SOCKET_EVENTS.CONNECT_ERROR, error.message);
      setIsConnected(false);
    });

    socketManager.socket.on(SOCKET_EVENTS.AUTHENTICATED, (error) => {
      if (
        socketManager.socket.disconnected ||
        typeof socketManager.socket.auth !== 'object' ||
        typeof socketManager.socket.auth.token !== 'string'
      ) {
        return;
      }
      //TODO dispatch socketAuthenticatd Redux
    });

    socketManager.socket.on(SOCKET_EVENTS.MESSAGE_CAST, (chatMessage: IChatMessage) => {
      dispatch(upsertMessage({ chatMessage, entityId: individual?.entityId ?? '' }));
    });

    socketManager.socket.on(SOCKET_EVENTS.ROOM_CAST, (room: IChatRoom) => {
      dispatch(addOrUpdateChatRoom(room));
    });

    socketManager.socket.on(SOCKET_EVENTS.MESSAGE_SEEN, (chatMessage: IChatMessage) => {
      dispatch(upsertMessage({ chatMessage, entityId: individual?.entityId ?? '' }));
    });

    socketManager.socket.on(SOCKET_EVENTS.USER_STATUS, (user: IChatUser) => {
      dispatch(updateChatUser(user));
    });
  }, [dispatch]);

  useEffect(() => {
    initializeCallbacks();
  }, [initializeCallbacks]);

  useEffect(() => {
    //connect socket once user is logged in
    if (!isUndefined(user) && !isEmpty(token) && !isUndefined(selectedEntity) && !isConncted) {
      connectToSocket();
      setIsConnected(true);
    }
  }, [connectToSocket, initializeCallbacks, isConncted, selectedEntity, token, user]);

  return <></>;
};

export default Communication;
