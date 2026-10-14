import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { SaleReports } from '../sale-reports';

@Component({
  selector: 'app-data-table',
  imports: [DxDataGridModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTable {
  private readonly saleReports = inject(SaleReports);

  protected readonly reports = this.saleReports.reports;
  protected readonly agentCodes = this.saleReports.agentCodes;
}
