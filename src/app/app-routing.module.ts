import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'chart',component: ChartPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
