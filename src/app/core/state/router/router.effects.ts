import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { pluck, tap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';

import * as ra from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType<ra.Go>(ra.ROUTER_GO),
    pluck('payload'),
    tap(({ path, queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType<ra.Back>(ra.ROUTER_BACK),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType<ra.Forward>(ra.ROUTER_FORWARD),
    tap(() => this.location.forward())
  );
}
