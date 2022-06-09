import {
  ActionCreator,
  createAction,
  props,
} from '@ngrx/store';
import { Post } from "../../../model/post";
import {
  Collection,
  GetCollectionFilter,
  GetCollectionParams
} from "../../../services/data.service";

export const init = createAction(
  '[Posts] init',
);

export const getPosts = createAction(
  '[Posts] getPosts',
  props<{ getCollectionParams: GetCollectionParams}>()
);

export const setPosts = createAction(
  '[Posts] setPosts',
  props<{ postsCollection: Collection<Post>, error: Error }>()
);

export const setFilter = createAction(
  '[Posts] setFilter',
  props<{ filter: GetCollectionFilter}>()
)

export const setPageNum = createAction(
  '[Posts] setPageNum',
  props<{ pageNum: number}>()
)

export const initStateFromQueryParams = createAction(
  '[Posts] initStateFromQueryParams',
  props<{ getCollectionParams: GetCollectionParams}>()
)

type ExtractActionPayloadType<Type> = (Type extends ActionCreator<any, infer V> ? V : never) extends (p: infer T) => infer T & any ? T : never
export type GetPostsType = ExtractActionPayloadType<typeof getPosts>;
export type SetFilterType = ExtractActionPayloadType<typeof setFilter>;
