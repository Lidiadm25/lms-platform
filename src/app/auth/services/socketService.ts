import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager, Socket, io } from 'socket.io-client';
import { OnlineClient } from '../../shared/components/my-drawer/chat-component/interfaces/online.interface';
import { NewMessageDto } from '../interfaces/messageDto';
let socket!: Socket;
// export const connectToServer = (token: string) => {
//   const manager = new Manager('http://localhost:3000', {
//     extraHeaders: {
//       authentication: token,
//     },
//   });

//   socket = manager.socket('/');
// };

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor() {
    let token = localStorage.getItem('token');
    if (token == null) throw new Error();
    socket = io('http://localhost:3000', {
      extraHeaders: {
        authentication: token,
      },
    });
  }

  disconnect() {
    if (socket) socket.disconnect();
  }

  requestConnected() {
    socket.emit('get_online');
  }

  getConnectedClients(): Observable<OnlineClient[]> {
    return new Observable((observer) => {
      socket.on('clients-updated', (clients: OnlineClient[]) => {
        observer.next(clients);
      });
    });
  }

  sendMessage(message: NewMessageDto) {
    socket.emit('send_message_private', message);
  }

  onMessage() {
    return new Observable((observer) => {
      socket.on('receive_private_message', (data) => {
        observer.next(data);
      });
    });
  }
}
