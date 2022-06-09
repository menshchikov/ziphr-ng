import {
  createReducer,
  on
} from '@ngrx/store';
import { Post } from "../../../model/post";
import {
  getPosts,
  init,
  initStateFromQueryParams,
  setFilter,
  setPageNum,
  setPosts,
} from "./posts.actions";
import {
  GetCollectionFilter,
  PAGE_SIZE
} from "../../../services/data.service";

export const postsFeatureKey = 'posts';

export interface PostsState {
  isLoading: boolean;
  posts: Post[];
  pageNumber: number;
  filter: GetCollectionFilter;
  error: Error;
  totalPages: number;
}

export const initialState: PostsState = {
  posts: [],
  filter: { fieldName: "userId", expression: '', operator: 'eq' },
  isLoading: false,
  pageNumber: 0,
  error: undefined,
  totalPages: 0,
};

export const postsReducer = createReducer(
  initialState,
  on(init, (state) => ({
    ...state,
    isLoading: true,
    error: undefined,
  })),
  on(setFilter, (state, action) => ({
    ...state,
    filter: action.filter,
    pageNumber: 0,
  })),
  on(setPageNum, (state, { pageNum }) => ({
    ...state,
    pageNumber: pageNum,
  })),
  on(getPosts, (state, action) => ({
    ...state,
    posts: [],
    error: undefined,
    isLoading: true,
  })),
  on(setPosts, (state, { postsCollection, error }) => ({
    ...state,
    posts: postsCollection.items,
    error: error,
    totalPages: Math.ceil(postsCollection.count / PAGE_SIZE),
    isLoading: false,
  })),
  on(initStateFromQueryParams, (state, action) => ({
    ...state,
    filter: action.getCollectionParams.filters[0],
    pageNumber: action.getCollectionParams.pageNumber,
  }))
);
