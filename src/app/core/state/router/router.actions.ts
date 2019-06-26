import { NavigationExtras } from '@angular/router';

import { Action } from '@ngrx/store';

export const ROUTER_GO = '[Router] - Go';
export const ROUTER_BACK = '[Router] - Back';
export const ROUTER_FORWARD = '[Router] - Forward';

export interface GoPayload {
  path: any[];
  queryParams?: object;
  extras?: NavigationExtras;
}

export class Go implements Action {
  readonly type = ROUTER_GO;
  constructor(public payload: GoPayload) {}
}

export class Back implements Action {
  readonly type = ROUTER_BACK;
}

export class Forward implements Action {
  readonly type = ROUTER_FORWARD;
}

export type RouterActions = Go | Back | Forward;
