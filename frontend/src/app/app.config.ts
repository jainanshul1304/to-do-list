import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route, RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(),provideRouter(routes),provideToastr(),provideAnimations()]
};
