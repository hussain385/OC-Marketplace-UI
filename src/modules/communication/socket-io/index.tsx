/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Manager, Socket } from 'socket.io-client';

/**
 * @class SocketIOManager
 * @version 2.0.0
 * @description This a static class for socket communication tool version 2
 * @method getInstance - instance of SocketIOManager
 */
export class SocketIOManager {
  //[x: string]: any;
  private static instance: any;
  private socketManager: Manager = new Manager(`${import.meta.env.VITE_API_SERVER_URL}`, {
    path: '/api/v2/communication/chat',
    reconnection: false,
    autoConnect: false,
    upgrade: true,
  });

  public readonly socket: Socket;

  constructor() {
    this.socket = this.socketManager.socket('/');
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new SocketIOManager());
  }

  /**
   * @name initialize
   * @param {string} token
   * @param {string} xClientId
   */
  public initialize(token: string, xClientId: string) {
    this.socket.auth = {
      token: `Bearer ${token}`,
      xClientId,
    };
  }

  public disconnect() {
    this.socket.auth = {};
    this.socket.disconnect();
  }
}
