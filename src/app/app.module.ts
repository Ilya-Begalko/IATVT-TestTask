import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  DxDataGridModule,
  DxButtonModule,
  DxScrollViewModule,
  DxPopupModule,
  
} from 'devextreme-angular';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { DataTableComponent } from './shared/components/data-table/data-table.component';

import { DataChartModule } from './shared/components/data-chart/data-chart.module';

import { ApiService } from './shared/services/api.service';
import { ChartService } from './shared/services/chart.service';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChartPageComponent,
    MainHeaderComponent,
    DataTableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxButtonModule,
    DxScrollViewModule,
    DxPopupModule,
    DataChartModule
  ],
  providers: [ApiService, ChartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
