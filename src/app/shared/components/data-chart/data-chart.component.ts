import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../services/api.service';
import { ChartService } from '../../services/chart.service';

import { EChartsOption } from 'echarts';

@Component({
  selector: 'data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.component.scss'],
})
export class DataChartComponent {
  visDatePicker: boolean = true;
  dataSource: any;
  visTitleNoData: boolean = false;

  constructor(
    private apiService: ApiService,
    private chartService: ChartService
  ) {
    this.apiService.getData().subscribe(async (item: any) => {
      this.dataSource = item.items;
      this.dataSource = this.chartService.createSeries(this.dataSource);
      console.log(this.dataSource);
    });
  }

  options: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  activeDatePicker(start: any, end: any) {
    
    if(start && end){
      start = moment(start).format('DD-MM-yyyy');
      end = moment(end).format('DD-MM-yyyy');
      this.apiService.getData().subscribe(async (item: any) => {
        this.dataSource = item.items;
        this.dataSource = this.chartService.createSeriesWithRange(this.dataSource, start, end);
        console.log(this.dataSource)
      });
    }else{
      alert("Даты не были введены")
    }


    /* обновить график*/

    this.visDatePicker = false;
  }

  openDatePicker() {
    this.visDatePicker = true;
  }
}
