import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(import.meta.env.VITE_BACKEND_URL);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  off(event: string, callback: (data: any) => void) {
    this.socket.off(event, callback);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const socketService = new SocketService();
export default socketService;
