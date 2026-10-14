import { locale } from 'devextreme/localization';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

locale('ru');

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
