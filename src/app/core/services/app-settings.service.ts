import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators';

import { AppSettings } from '../models/app-settings';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AppSettingsService {
  private readonly settingsKey = 'app-settings';
  private readonly url = 'http://localhost:3000';

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  loadSettings(): Observable<AppSettings> {
    let settings: Observable<AppSettings>;
    const settingsStr = this.localStorageService.getItem(this.settingsKey);
    if (settingsStr) {
      settings = of(JSON.parse(settingsStr));
    } else {
      settings = this.http.get(this.url + '/' + 'settings').pipe(
        catchError(() => {
          return of(this.initDefaultSettings());
        }),
        map(s => s || this.initDefaultSettings()),
        tap(s =>
          this.localStorageService.setItem(this.settingsKey, JSON.stringify(s))
        )
      );
    }

    return settings;
  }

  private initDefaultSettings(): AppSettings {
    return {
      color: 'default'
    };
  }
}
