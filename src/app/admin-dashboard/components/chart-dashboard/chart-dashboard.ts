import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-dashboard',
  imports: [],
  templateUrl: './chart-dashboard.html',
  styleUrl: './chart-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDashboard  {
}