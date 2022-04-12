import {  createReducer, on } from '@ngrx/store';
import {
  init,
  initStateFromQueryParams,
  setFilter,
  setPageNum,
  setAlbumsWithPhotos,
  getAlbumsWithPhotos,
} from "./albums.actions";
import {
  AlbumWithPhotos
} from "../../../model/album";
import {
  GetCollectionFilter,
  PAGE_SIZE
} from "../../../services/data.service";

export const albumsFeatureKey = 'albums';

export interface AlbumsState {
  isLoading: boolean;
  albumsWithPhotos: AlbumWithPhotos[];
  pageNumber: number;
  filter: GetCollectionFilter;
  error: Error;
  totalPages: number;
}

export const initialState: AlbumsState = {
  albumsWithPhotos: [],
  filter: { fieldName: "userId", expression: '', operator: 'eq' },
  isLoading: false,
  pageNumber: 0,
  error: undefined,
  totalPages: 0,
};

export const albumsReducer = createReducer(
  initialState,
  on(init,(state ) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(setFilter, (state, action) => ({
    ...state,
    filter: action.filter,
    pageNumber: 0,
  })),
  on(setPageNum, (state, { pageNum}) => ({
    ...state,
    pageNumber: pageNum,
  })),
  on(getAlbumsWithPhotos, (state, action) => ({
    ...state,
    albumsWithPhotos: [],
    error: undefined,
    isLoading: true,
  })),
  on(setAlbumsWithPhotos, (state, action) => ({
    ...state,
    albumsWithPhotos: action.collection.items,
    error: action.error,
    totalPages: Math.ceil(action.collection.count / PAGE_SIZE),
    isLoading: false,
  })),
  on(initStateFromQueryParams, (state, action) => ({
    ...state,
    filter: action.getCollectionParams?.filters[0],
    pageNumber: action.getCollectionParams.pageNumber,
  }))
);
