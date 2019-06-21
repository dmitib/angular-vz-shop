import { Component, Inject, Optional } from '@angular/core';

import {
  ConfigOptionsService,
  ConstantsService,
  generator10,
  LocalStorageService
} from '../../core/services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  appVer: string;
  appName: string;
  id: string;

  constructor(
    @Optional() private configService: ConfigOptionsService,
    @Optional() private constantsService: ConstantsService,
    @Optional() private localStorageService: LocalStorageService,
    @Inject(generator10) @Optional() private generator: string
  ) {
    this.initConfiguration();
    this.initAppInfo();
    this.saveToStorage();
  }

  private initConfiguration() {
    this.configService.setConfig({
      id: this.generator
    });
    this.id = this.configService.getConfig('id');
  }

  private initAppInfo() {
    this.appName = this.constantsService.app;
    this.appVer = this.constantsService.ver;
  }

  private saveToStorage() {
    this.localStorageService.setItem('id', this.id);
  }
}
