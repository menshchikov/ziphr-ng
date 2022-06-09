import { Action, createReducer, on } from '@ngrx/store';
import { Post } from "../../../model/post";
import { Photo } from "../../../model/photo";
import {
  init,
  setData
} from "./dashboard.actions";


export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  isLoading: boolean;
  postsCount: number;
  albumsCount: number;
  photosCount: number;
  latestPosts: Post[];
  latestPhotos: Photo[];
  error: Error;
}

export const initialState: DashboardState = {
  albumsCount: 0,
  isLoading: false,
  latestPhotos: [],
  latestPosts: [],
  photosCount: 0,
  postsCount: 0,
  error: undefined,
};

export const dashboardReducer = createReducer(
  initialState,
  on(init,(state ) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(setData, (state, { data }) => ({
    ...data,
    isLoading: false
  }))
);
