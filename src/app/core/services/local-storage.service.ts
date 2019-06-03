import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {
  private storage = localStorage;

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
