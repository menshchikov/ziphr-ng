import {  createReducer, on } from '@ngrx/store';
import { Post } from "../../../model/post.model";
import {
  init,
  initStateFromQueryParams,
  setFilter,
  setPageNum,
  setPosts,
} from "./posts.actions";
import { PAGE_SIZE } from "./posts.effects";


export const postsFeatureKey = 'posts';

export interface PostsState {
  isLoading: boolean;
  posts: Post[];
  pageNumber: number;
  filterField: string;
  filterExpression: string;
  error: Error;
  totalPages: number;
}

export const initialState: PostsState = {
  posts: [],
  filterExpression: '',
  filterField: "userId",
  isLoading: false,
  pageNumber: 0,
  error: undefined,
  totalPages: 0,
};

export const postsReducer = createReducer(
  initialState,
  on(init,(state ) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(setFilter, (state, { field,expression }) => ({
    ...state,
    filterExpression: expression,
    filterField: field,
    // isLoading: true,
  })),
  on(setPageNum, (state, { pageNum}) => ({
    ...state,
    pageNumber: pageNum,
    // isLoading: true,
  })),
  on(setPosts, (state, { postsCollection, error }) => ({
    ...state,
    posts: postsCollection.items,
    error: error,
    totalPages: Math.ceil(postsCollection.count / PAGE_SIZE),
    isLoading: false,
  })),
  on(initStateFromQueryParams, (state, { getPostsParams }) => ({
    ...state,
    filterField: getPostsParams.field || 'title',
    filterExpression: getPostsParams.expression || '',
    pageNumber: getPostsParams.pageNumber,
  }))
);
