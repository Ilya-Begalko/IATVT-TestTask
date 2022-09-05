import { NgModule } from '@angular/core';

import { DataChartComponent } from './data-chart.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  DxButtonModule,
  DxPopupModule,
  DxDateBoxModule,
  DxScrollViewModule
} from 'devextreme-angular';

import { CommonModule } from '@angular/common';

import * as echarts from 'echarts/core';
import { NgxEchartsModule } from 'ngx-echarts';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

@NgModule({
  declarations: [DataChartComponent],
  exports: [DataChartComponent],
  imports: [
    CommonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    DxButtonModule,
    DxPopupModule,
    DxDateBoxModule,
    DxScrollViewModule,
    NoopAnimationsModule
  ],

  providers: [],
})
export class DataChartModule {}
