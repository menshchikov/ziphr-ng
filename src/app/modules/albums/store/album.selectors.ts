import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  albumFeatureKey,
  AlbumState
} from "./album.reducer";

export const selectAlbumState = createFeatureSelector<AlbumState>(albumFeatureKey);
export const selectAlbumIsLoading = createSelector(
  selectAlbumState,
  state => state.isAlbumLoading || state.isPhotosLoading
)
export const selectAlbumPhotosFilter = createSelector(
  selectAlbumState,
  state => state.photosFilter
)
export const selectAlbumAlbum = createSelector(
  selectAlbumState,
  state => state.album
)
export const selectAlbumPageNumber = createSelector(
  selectAlbumState,
  state => state.currentPageNum
)
export const selectAlbumTotalPages = createSelector(
  selectAlbumState,
  state => state.totalCount
)
export const selectAlbumAlbumId = createSelector(
  selectAlbumState,
  state => state.albumId
)
export const selectAlbumPhotos = createSelector(
  selectAlbumState,
  state => state.photos
)
