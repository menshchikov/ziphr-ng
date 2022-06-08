import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPhotos from './photos.reducer';

export const selectPhotosState = createFeatureSelector<fromPhotos.State>(
  fromPhotos.photosFeatureKey
);

export const selectPhotosPhotos = createSelector(
  selectPhotosState,
  state => state.photos
);
export const selectPhotosFilter = createSelector(
  selectPhotosState,
  state => state.filter
);
export const selectPhotosIsLoading = createSelector(
  selectPhotosState,
  state => state.isLoading
);
export const selectPhotosPageNum = createSelector(
  selectPhotosState,
  state => state.pageNumber
);
export const selectPhotosTotalCount = createSelector(
  selectPhotosState,
  state => state.totalCount
);
