import { bootstrapApplication } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; 
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideNoopAnimations(),
    ...(appConfig.providers || [])
  ]
}).catch((err) => console.error(err));
