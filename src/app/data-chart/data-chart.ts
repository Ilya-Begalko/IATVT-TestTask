import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { DxButtonModule, DxDateBoxModule, DxPopupModule, DxScrollViewModule } from 'devextreme-angular';
import type { EChartsCoreOption } from 'echarts/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { SaleReports } from '../sale-reports';
import { createChartSeries, DateRange, toDate } from './chart-series';
import { echarts } from './echarts';

@Component({
  selector: 'app-data-chart',
  imports: [NgxEchartsDirective, DxButtonModule, DxPopupModule, DxDateBoxModule, DxScrollViewModule],
  templateUrl: './data-chart.html',
  styleUrl: './data-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEchartsCore({ echarts })],
})
export class DataChart {
  private readonly saleReports = inject(SaleReports);
  private readonly range = signal<DateRange | null>(null);
  private readonly compactAxis = signal(window.matchMedia('(max-width: 720px)').matches);

  constructor() {
    const media = window.matchMedia('(max-width: 720px)');
    const onChange = (event: MediaQueryListEvent) => this.compactAxis.set(event.matches);
    media.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => media.removeEventListener('change', onChange));
  }

  protected readonly pickerOpen = signal(false);
  protected readonly loading = this.saleReports.reportsLoading;
  protected readonly options = computed((): EChartsCoreOption => {
    const series = createChartSeries(this.saleReports.reports(), this.range());
    return {
      tooltip: { trigger: 'axis' },
      grid: { left: 8, right: 16, top: 24, bottom: 8, containLabel: true },
      dataZoom: [{ type: 'inside' }],
      xAxis: {
        type: 'category',
        data: series.arg,
        axisLabel: {
          color: '#d5d7e2',
          hideOverlap: true,
          rotate: this.compactAxis() ? 50 : 0,
          fontSize: this.compactAxis() ? 10 : 12,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#d5d7e2' },
        splitLine: { lineStyle: { color: '#32364a' } },
      },
      series: [{ data: series.val, type: 'line', symbol: 'circle', symbolSize: 7 }],
    };
  });

  protected openDatePicker(): void {
    this.pickerOpen.set(true);
  }

  protected applyRange(start: unknown, end: unknown): void {
    const startDate = toDate(start);
    const endDate = toDate(end);
    if (!startDate || !endDate) {
      alert('Даты не были введены');
      return;
    }

    this.range.set({ start: startDate, end: endDate });
    this.pickerOpen.set(false);
  }
}
