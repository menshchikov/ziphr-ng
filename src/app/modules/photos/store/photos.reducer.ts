import { createReducer, on } from '@ngrx/store';
import * as PhotosActions from './photos.actions';
import { Photo } from "../../../model/photo";
import { GetCollectionFilter } from "../../../services/data.service";

export const photosFeatureKey = 'photos';
export const PHOTOS_PAGE_SIZE = 8;

export interface State {
 photos: Photo[];
 isLoading: boolean;
  filter: GetCollectionFilter;
  pageNumber: number;
  totalCount: number;
  error: Error;
}

export const initialState: State = {
  photos: [],
  isLoading: false,
  filter: {fieldName:'albumId', expression: '', operator: 'eq'},
  pageNumber: 0,
  totalCount: 0,
  error: undefined,
};

export const reducer = createReducer(
  initialState,

  on(PhotosActions.init, (state): State => state),
  on(PhotosActions.getPhotos, (state, action): State => {
    return {
      ...state,
      isLoading: true,
      photos: [],
      error: undefined,
    }
  }),
  on(PhotosActions.initStateFromQueryParams, (state, action): State => {
    return {
      ...state,
      filter: action.getCollectionParams.filters[0],
      pageNumber: action.getCollectionParams.pageNumber,
    }
  }),
  on(PhotosActions.setPhotos, (state, action) => {
    return {
      ...state,
      isLoading: false,
      photos: action.photosCollection?.items || [],
      totalCount: action.photosCollection ? Math.ceil(action.photosCollection.count / PHOTOS_PAGE_SIZE) : 0,
      error: action.error,
    }
  }),
  on(PhotosActions.setFilter, (state, action): State => {
    return {
      ...state,
      filter: action.filter,
      pageNumber: 0,
    }
  }),
  on(PhotosActions.setPageNum, (state, action): State => {
    return {
      ...state,
      pageNumber: action.pageNum,
    }
  }),

);
