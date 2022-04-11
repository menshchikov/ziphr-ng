import { createAction, props } from '@ngrx/store';
import { Post } from "../../../model/post.model";
import {
  Collection,
  GetPostsParams
} from "../../../services/data.service";

export const init = createAction(
  '[Posts] init',
);

export const setPosts = createAction(
  '[Posts] setPosts',
  props<{ postsCollection: Collection<Post>, error: Error }>()
);

export const setFilter = createAction(
  '[Posts] setFilter',
  props<{ field: string, expression: string}>()
)

export const setPageNum = createAction(
  '[Posts] setPageNum',
  props<{ pageNum: number}>()
)

export const initStateFromQueryParams = createAction(
  '[Posts] initStateFromQueryParams',
  props<{ getPostsParams: GetPostsParams}>()
)

