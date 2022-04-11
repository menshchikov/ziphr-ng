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
export const selectPostsFilterField = createSelector(
  selectPostsState,
  state => state.filterField
)
export const selectPostsFilterExpression = createSelector(
  selectPostsState,
  state => state.filterExpression
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
