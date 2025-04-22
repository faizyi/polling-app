// client/src/services/poll/socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:8001', {
  transports: ['websocket'], // force using websocket instead of polling fallback
  withCredentials: true,
});

export default socket;
