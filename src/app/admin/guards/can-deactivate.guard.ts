import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '../../core/interfaces/can-component-deactivate.interface';
import { CoreModule } from '../../core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
