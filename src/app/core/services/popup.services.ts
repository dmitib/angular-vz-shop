import { Injectable } from '@angular/core';

import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class PopupService {
  confirm(message?: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      resolve(window.confirm(message || 'Are you sure?'));
    });
  }
}
