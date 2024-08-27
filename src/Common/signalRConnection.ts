import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

let connection: HubConnection | null = null;



export const getConnection = async (): Promise<HubConnection> => {
  if (connection) {
    return connection;
  }

  connection = new HubConnectionBuilder()
    .withUrl("http://localhost:7152/api/messageHub", {
      withCredentials: true 
    })
    .withAutomaticReconnect()
    
    .build();

  try {
    await connection.start();
    console.log('SignalR Connected');
  } catch (err) {
    console.log('SignalR Connection Error: ', err);
    throw err;
  }

  return connection;
};

export const closeConnection = async (): Promise<void> => {
  if (connection) {
    await connection.stop();
    connection = null;
    console.log('SignalR Disconnected');
  }
};