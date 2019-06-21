import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';
import { ConfigOption } from '../models/config-option';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  private config: ConfigOption;

  setConfig(option: ConfigOption) {
    this.config = {
      ...this.config,
      ...option
    };
  }

  getConfig(key: string): string {
    return this.config[key];
  }
}
