
import io from 'socket.io-client';

// You can replace this with your socket server URL if you have a custom one
const SOCKET_SERVER_URL = 'http://your-socket-server-url.com'; 

let socket;

export const connectSocket = () => {
  socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] });

  socket.on('connect', () => {
    console.log('Connected to the socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the socket server');
  });
};

export const sendMessage = (message) => {
  socket.emit('send_message', message);
};

export const receiveMessage = (callback) => {
  socket.on('receive_message', (message) => {
    callback(message);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
