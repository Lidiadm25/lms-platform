import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartDashboard } from "../../components/chart-dashboard/chart-dashboard";

@Component({
  selector: 'app-dashboard-page',
  imports: [ChartDashboard],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
}
