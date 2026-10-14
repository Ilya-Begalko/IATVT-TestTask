import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-page/main-page').then((m) => m.MainPage),
    data: { heading: 'Экран отображения данных ' },
  },
  {
    path: 'chart',
    loadComponent: () => import('./chart-page/chart-page').then((m) => m.ChartPage),
    data: { heading: 'Экран отчета ' },
  },
];
