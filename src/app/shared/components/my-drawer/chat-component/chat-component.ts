import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { jwtToken } from '../../../../auth/interfaces/auth-response.interface';
import { NewMessageDto } from '../../../../auth/interfaces/messageDto';
import { SocketService } from '../../../../auth/services/socketService';
import { OnlineClient } from './interfaces/online.interface';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.css',
})
export class ChatComponent {
  name = signal<string>('Chat app');
  message = model<string>('');
  messages = signal<string[]>([]);

  onlineUsers = signal<OnlineClient[] | null>(null);
  searchTerm = signal<string>('');

filteredUsers = computed(() => {
  const users = this.onlineUsers();
 
  if (users == null) return [];

  const term = this.searchTerm()?.trim().toLowerCase();
  if (!term) return [];
  if(term == '') return []
 
  console.log(term)
  return users.filter(user =>
    user.user_fullname.toLowerCase().trim().includes(term)
  );
});

  selectedUser = signal<string>('');

  constructor(private socketService: SocketService) {
    
  }

  openDropdown() {

    var dropdown = document.getElementById('dropdown-content');
    if (dropdown != null) dropdown.classList.toggle('hidden');
  }

  ngOnInit(): void {
    this.socketService.requestConnected();
    this.socketService.onMessage((msg: NewMessageDto) => {
      console.log(msg);
      this.messages.update((array) => [...array, msg.message]);
      console.log(this.messages());
    });

    this.socketService.getConnectedClients((online: OnlineClient[]) => {
      console.log('usuarios recibidos: '+ online);
      this.onlineUsers.set(online);
      
    });
  }

  sendMessage(): void {
    if (this.message().trim()) {
      var newMessage: NewMessageDto;
      let token = localStorage.getItem('token');
      if (!token) return;
      let decoded = jwtDecode<jwtToken>(token);
      newMessage = {
        message: this.message(),
        user_id: decoded.id,
      };
      this.socketService.sendMessage(newMessage);
      this.message.set('');
      console.log('valor del model: ' + this.message());
    }
  }

  selectUserChat(client : OnlineClient){
    this.selectedUser.set(client.user_id)
    this.name.set(client.user_fullname)
    console.log(client.user_id)
    this.openDropdown()
  }

  searchUsers(event: Event) {
    console.log('entra aqui');
    

    var input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
