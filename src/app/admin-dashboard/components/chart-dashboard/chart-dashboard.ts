import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-dashboard',
  imports: [],
  templateUrl: './chart-dashboard.html',
  styleUrl: './chart-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDashboard implements OnInit {
  chart: any;

  ngOnInit(): void {
    this.createBarChart();
  }

  createBarChart() {
    this.chart = new Chart('MyChart', {
      type: 'doughnut',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      
        datasets: [
          {
            label: 'Sales',
            data: [300, 500, 400, 700],
            backgroundColor: 'blue',
          },
          {
            label: 'Profit',
            data: [200, 400, 300, 600],
            backgroundColor: 'green',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        aspectRatio: 2.5,
      },
    });
  }
}

