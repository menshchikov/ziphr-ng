import {  createReducer, on } from '@ngrx/store';
import {
  getAlbum,
  getPhotos,
  init,
  initStateFromQueryParams,
  setAlbum,
  setFilter,
  setPageNum,
  setPhotos,
} from "./album.actions";
import {
  Album,
} from "../../../model/album";
import {
  GetCollectionFilter,
} from "../../../services/data.service";
import { Photo } from "../../../model/photo";
import { HttpErrorResponse } from "@angular/common/http";

export const albumFeatureKey = 'album';

export const PHOTOS_PAGE_SIZE = 8;

export interface AlbumState {
  isAlbumLoading: boolean,
  isPhotosLoading: boolean,
  albumId: number,
  album: Album,
  photos: Photo[],
  photosFilter: GetCollectionFilter,
  totalCount: number,
  currentPageNum: number,
  error: HttpErrorResponse,
}

export const initialState: AlbumState = {
  isAlbumLoading: false,
  isPhotosLoading: false,
  albumId: 0,
  album: undefined,
  photos: [],
  photosFilter: { fieldName: 'title', expression: '', operator: 'ct' },
  totalCount: 0,
  currentPageNum: 0,
  error: undefined,
};

export const albumReducer = createReducer(
  initialState,
  on(init,(state ) => ({
    ...state,
    isAlbumLoading: true,
    isPhotosLoading: true,
    error: undefined,
  })),
  on(setFilter, (state, action) => ({
    ...state,
    photosFilter: action.filter,
    currentPageNum: 0,
  })),
  on(setPageNum, (state, { pageNum}) => ({
    ...state,
    currentPageNum: pageNum,
  })),
  on(getAlbum, (state, action) => ({
    ...state,
    albumId: action.albumId,
    album: undefined,
    error: undefined,
    isAlbumLoading: true,
  })),
  on(setAlbum, (state, action) => ({
    ...state,
    album: action.album,
    error: action.error,
    isAlbumLoading: false,
  })),
  on(getPhotos, (state, action) => ({
    ...state,
    photos: undefined,
    error: undefined,
    isPhotosLoading: true,
  })),
  on(setPhotos, (state, action) => ({
    ...state,
    photos: action.photos.items,
    totalCount: Math.ceil(action.photos.count / PHOTOS_PAGE_SIZE),
    error: action.error,
    isPhotosLoading: false,
  })),
  on(initStateFromQueryParams, (state, action) => ({
    ...state,
    photosFilter: action.getCollectionParams?.filters[0],
    pageNumber: action.getCollectionParams.pageNumber,
  }))
);
