import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChartPageComponent,
    MainHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
