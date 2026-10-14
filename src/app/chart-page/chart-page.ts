import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataChart } from '../data-chart/data-chart';

@Component({
  selector: 'app-chart-page',
  imports: [DataChart],
  templateUrl: './chart-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPage {}
