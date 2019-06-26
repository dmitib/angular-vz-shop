import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from './router.state';

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');

export const getRouterParam = (param: string) =>
createSelector(
  getRouterState,
  state =>
    state && state.state && state.state.params && state.state.params[param]
);
