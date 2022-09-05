import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../services/api.service';
import { ChartService } from '../../services/chart.service';

import * as echarts from 'echarts/core';

@Component({
  selector: 'data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
})
export class DataChartComponent implements OnInit, OnChanges {
  visDatePicker: boolean = false;
  dataSource: any;
  visTitleNoData: boolean = false;

  constructor(
    private apiService: ApiService,
    private chartService: ChartService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  confirmOptionsForEchart(dataSource: any) {
    this.options = {
      tooltip: {
        trigger: 'axis'
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      xAxis: {
        type: 'category',
        data: dataSource.arg,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: dataSource.val,
          type: 'line',
        },
      ],
    };
  }

  @ViewChild('main')
  chartElement!: ElementRef;
  myChart: any;
  options: any;

  ngOnInit() {
    this.apiService.getData().subscribe(async (item: any) => {
      this.dataSource = item.items;
      this.dataSource = this.chartService.createSeries(this.dataSource);
      this.confirmOptionsForEchart(this.dataSource);
      console.log(this.dataSource);
      this.viewInit();
    });
  }

  viewInit() {
    if (this.chartElement && !this.myChart) {
      this.myChart = echarts.init(this.chartElement.nativeElement);
    }
    this.myChart.setOption(this.options);
  }

  activeDatePicker(start: any, end: any) {
    if (start && end) {
      this.apiService.getData().subscribe(async (item: any) => {
        this.dataSource = item.items;
        this.dataSource = this.chartService.createSeriesWithRange(
          this.dataSource,
          start,
          end
        );

        this.options.xAxis.data = this.dataSource.arg;
        this.options.series[0].data = this.dataSource.val;
        this.myChart.setOption(this.options);
      });
    } else {
      alert('Даты не были введены');
    }

    this.visDatePicker = false;
  }

  openDatePicker() {
    this.visDatePicker = true;
  }
}
