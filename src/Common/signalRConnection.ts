import { HubConnectionBuilder, HttpTransportType, HubConnection, HubConnectionState } from '@microsoft/signalr';

let connection: HubConnection | null = null;

export const getConnection = async (): Promise<HubConnection> => {
  if (connection && connection.state === HubConnectionState.Connected) {
    return connection;
  }

  if (connection) {
    await connection.stop();
  }

  connection = new HubConnectionBuilder()
    .withUrl("http://localhost:7152/messageHub", {
      withCredentials: true
    })
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .build();

  connection.onreconnecting((error) => {
    console.log("Attempting to reconnect:", error);
  });

  connection.onreconnected((connectionId) => {
    console.log("Reconnected:", connectionId);
  });

  connection.onclose((error) => {
    console.log("Connection closed:", error);
    connection = null;
  });

  try {
    await connection.start();
    console.log('SignalR Connected');
  } catch (err) {
    console.log('SignalR Connection Error: ', err);
    connection = null;
    throw err;
  }

  return connection;
};

export const closeConnection = async (): Promise<void> => {
  if (connection) {
    try {
      await connection.stop();
      connection = null;
      console.log('SignalR Disconnected');
    } catch (error) {
      console.error('Error stopping SignalR connection:', error);
    }
  }
};