import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  postsFeatureKey,
  PostsState
} from "./posts.reducer";

export const selectPostsState = createFeatureSelector<PostsState>(postsFeatureKey);
export const selectPostsIsLoading = createSelector(
  selectPostsState,
  state => state.isLoading
)
export const selectPostsFilter = createSelector(
  selectPostsState,
  state => state.filter
)
export const selectPostsPosts = createSelector(
  selectPostsState,
  state => state.posts
)
export const selectPostsPageNumber = createSelector(
  selectPostsState,
  state => state.pageNumber
)
export const selectPostsTotalPages = createSelector(
  selectPostsState,
  state => state.totalPages
)
