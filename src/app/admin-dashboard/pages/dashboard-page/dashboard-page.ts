import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ChartDashboard } from '../../components/chart-dashboard/chart-dashboard';
import { SocketService } from '../../../auth/services/socketService';
import { UsersProjectService } from '../../../projects/services/UsersProjectService';
import { OnlineClient } from '../../../shared/components/my-drawer/chat-component/interfaces/online.interface';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-dashboard-page',
  imports: [ChartDashboard],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  socketService = inject(SocketService);
  totalOnlineClients = signal<OnlineClient[]>([]);
  totalAllTime = signal<number>(0);
  totalCurrent = signal<number>(0);
  usersCurrent = signal<Partial<User[]>>([]);
  userProjectService = inject(UsersProjectService);

  onlineFiltered = computed(() => {
    const totalOnline = this.totalOnlineClients();
    var newCounter = 0;
    for (let index = 0; index < totalOnline.length; index++) {
      const element = totalOnline[index];
      if (element.user_id.match(this.usersCurrent()[index]!.id)) {
        newCounter++;
      }
    }

    return newCounter;
  });

  constructor() {
    this.socketService.getConnectedClients().subscribe((data) => this.totalOnlineClients.set(data));
    this.userProjectService.getAllTime().subscribe((data) => this.totalAllTime.set(data));
    this.userProjectService.getCurrent().subscribe((data) => this.usersCurrent.set(data));
  }
}
