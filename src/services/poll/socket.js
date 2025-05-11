// client/src/services/poll/socket.js
import io from 'socket.io-client';

const socket = io('https://polling-app-server-production.up.railway.app/', {
  transports: ['websocket'], // force using websocket instead of polling fallback
  withCredentials: true,
});

export default socket;
