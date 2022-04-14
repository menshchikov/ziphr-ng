import {
  ActionCreator,
  createAction,
  props
} from '@ngrx/store';
import { DashboardState } from "./dashboard.reducer";

export const init = createAction(
  '[Dashboard] init',
);

export const setData = createAction(
  '[Dashboard] setData',
  props<{ data: DashboardState }>()
);
