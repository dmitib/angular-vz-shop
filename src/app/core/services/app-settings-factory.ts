import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { AppSettings } from '../models/app-settings';
import { AppSettingsService } from './app-settings.service';

export const AppSettings$ = new InjectionToken<Observable<AppSettings>>(
  'AppSettings$'
);

export function appSettingsFactory() {
  return (appSettingsService: AppSettingsService): Observable<AppSettings> => {
    return appSettingsService.loadSettings();
  };
}
