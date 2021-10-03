import { io } from "socket.io-client";

// Connect to the backend via socket.io
const socket = io('/', {transports: ['websocket']});

export default socket;