import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { datasetSurvey } from '../../../projects/interfaces/survey.interface';
import { SurveyUserService } from '../../../projects/services/SurveyUserService';
echarts.use([BarChart, GridComponent, CanvasRenderer, PieChart, TooltipComponent]);
@Component({
  selector: 'app-chart-dashboard',
  imports: [NgxEchartsDirective],
  templateUrl: './chart-dashboard.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEchartsCore({ echarts })],
})
export class ChartDashboard {
  surveyUserService = inject(SurveyUserService);
  data = signal<datasetSurvey[]>([]);
  constructor() {
    this.surveyUserService.getAvgFromSurvey().subscribe((x) => {
      this.data.set(x);
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption({
        series: [
          {
            data: this.data().map((x) => ({
              value: parseInt(x.avg),
              name: x.course,
            })),
          },
        ],
      });
    });
  }

  options = {
    tooltip: {
      trigger: 'item',
    },

    series: [
      {
        name: 'Course rating',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: true,

        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },

        label: {
          show: false,
          position: 'center',
        },

        labelLine: {
          show: false,
        },

        data: [],
      },
    ],
  };
}
