import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../../../auth/services/socketService';
import { OnlineClient } from './interfaces/online.interface';

export interface ChatMessage {
  text: string;
  isMine: boolean;
}

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule],
  templateUrl: './chat-component.html',
})
export class ChatComponent {
  name = signal<string>('Chat app');
  message = model<string>('');
  messages = signal<ChatMessage[]>([]);

  onlineUsers = signal<OnlineClient[] | null>(null);
  searchTerm = signal<string>('');

  filteredUsers = computed(() => {
    const users = this.onlineUsers();
    const term = this.searchTerm().trim().toLowerCase();
    if (!users?.length) return [];
    if (!term) return [];
    if (term == '') return [];

    return users.filter((user) => user.user_fullname.toLowerCase().trim().includes(term));
  });

  selectedUser = signal<string>('');

  constructor(private socketService: SocketService) {}

  openDropdown() {
    var dropdown = document.getElementById('dropdown-content');
    if (dropdown != null) dropdown.classList.toggle('hidden');
  }

  ngOnInit(): void {
    this.socketService.requestConnected();
    this.socketService.onMessage().subscribe((msg: any) => {
      this.messages.update((array) => [...array, { text: msg.message, isMine: false }]);
    });

    this.socketService.getConnectedClients().subscribe((online: OnlineClient[]) => {
      this.onlineUsers.set(online);
    });
  }

  sendMessage(): void {
    if (this.message().trim() && this.selectedUser()) {
      const payload = {
        user_id: this.selectedUser(),
        message: this.message(),
      };
      this.socketService.sendMessage(payload);

      this.messages.update((array) => [...array, { text: this.message(), isMine: true }]);
      this.message.set('');
    }
  }

  selectUserChat(client: OnlineClient) {
    this.selectedUser.set(client.user_id);
    this.name.set(client.user_fullname);
    this.openDropdown();
    this.messages.set([]);
  }

  searchUsers(event: Event) {


    var input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }
}
