import { datasetQuestion, Question } from './../../../projects/interfaces/survey.interface';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { datasetSurvey } from '../../../projects/interfaces/survey.interface';
import { SurveyUserService } from '../../../projects/services/SurveyUserService';
import { EChartsOption } from 'echarts/types/dist/shared';
echarts.use([BarChart, GridComponent, CanvasRenderer, PieChart, TooltipComponent, LegendComponent, TitleComponent]);
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
  questionsData = signal<datasetQuestion[] | null>(null);
  selectedCourse = signal<string | null>(null);
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
              courseId: x.id,
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
    legend: {
      bot: '5%',
      left: 'center',
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

  options2 = computed<EChartsOption>(() => {
    const data = this.questionsData();
    return {
      title: {
        text: 'Answers to survey',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params:any)=>{
          const dataIndex = params[0].dataIndex;
          const fullQuestion = data![dataIndex].question;
          const avgValue = params[0].data;

          return `<b>${fullQuestion} </b> <br/> Average: ${avgValue}`
        }
      },
      xAxis: {
        type: 'category',
        data: data!.map((item, index) => `${index+1}`),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data!.map((item) => item.avg),
          type: 'bar',
        },
      ],
    };
  });

  onCourseSelect(event: any) {
    const id = event.data.courseId;

    if (id) {
      this.selectedCourse.set(id);
      this.getQuestions(id);
    }
  }

  getQuestions(id: string) {
    this.surveyUserService.getQuestionsAvg(id).subscribe((data) => {this.questionsData.set(data)
      console.log(data)
    });
  }
}
