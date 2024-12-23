import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/html/app.component';
import { appConfig } from './app/html/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
