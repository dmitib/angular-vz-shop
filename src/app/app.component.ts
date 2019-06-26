import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AppSettings$ } from './core/services/app-settings-factory';
import { AppSettings } from './core/models/app-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  settings: AppSettings;

  private settingsSub: Subscription;

  constructor(
    @Inject(AppSettings$) private appSettings$: Observable<AppSettings>
  ) {}

  ngOnInit() {
    this.settingsSub = this.appSettings$.subscribe(s => (this.settings = s));
  }

  bgColor(): string {
    const color: string = this.settings.color;

    if (color === 'white') {
      return 'bg-white';
    } else if (color === 'blue') {
      return 'bg-info';
    }
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }
}
