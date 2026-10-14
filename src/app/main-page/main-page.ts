import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTable } from '../data-table/data-table';

@Component({
  selector: 'app-main-page',
  imports: [DataTable],
  templateUrl: './main-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
