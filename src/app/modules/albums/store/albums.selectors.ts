import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  albumsFeatureKey,
  AlbumsState,
} from "./albums.reducer";

export const selectAlbumsState = createFeatureSelector<AlbumsState>(albumsFeatureKey);
export const selectAlbumsIsLoading = createSelector(
  selectAlbumsState,
  state => state.isLoading
)
export const selectAlbumsFilter = createSelector(
  selectAlbumsState,
  state => state.filter
)
export const selectAlbumsAlbumsWithPhotos = createSelector(
  selectAlbumsState,
  state => state.albumsWithPhotos
)
export const selectAlbumsPageNumber = createSelector(
  selectAlbumsState,
  state => state.pageNumber
)
export const selectAlbumsTotalPages = createSelector(
  selectAlbumsState,
  state => state.totalPages
)
