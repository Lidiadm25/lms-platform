import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChartDashboard } from "../../components/chart-dashboard/chart-dashboard";
import { SocketService } from '../../../auth/services/socketService';

@Component({
  selector: 'app-dashboard-page',
  imports: [ChartDashboard],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {

  socketService = inject(SocketService)
  totalOnline = signal<number>(0)
  constructor(){
    this.socketService.getConnectedClients().subscribe((data)=> this.totalOnline.set(data.length))
  }
}
