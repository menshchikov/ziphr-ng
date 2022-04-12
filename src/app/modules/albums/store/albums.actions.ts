import {
  ActionCreator,
  createAction,
  props
} from '@ngrx/store';
import {
  Collection,
  GetCollectionFilter,
  GetCollectionParams
} from "../../../services/data.service";
import {
  AlbumWithPhotos
} from "../../../model/album";

export const init = createAction(
  '[Albums] init',
);

export const getAlbumsWithPhotos = createAction(
  '[Albums] getAlbumsWithPhotos',
  props<{ getCollectionParams: GetCollectionParams }>()
);

export const setAlbumsWithPhotos = createAction(
  '[Albums] setAlbumsWithPhotos',
  props<{ collection: Collection<AlbumWithPhotos>, error: Error }>()
);

export const setFilter = createAction(
  '[Albums] setFilter',
  props<{ filter: GetCollectionFilter}>()
)

export const setPageNum = createAction(
  '[Albums] setPageNum',
  props<{ pageNum: number}>()
)

export const initStateFromQueryParams = createAction(
  '[Albums] initStateFromQueryParams',
  props<{ getCollectionParams: GetCollectionParams}>()
)

type ExtractActionPayloadType<Type> = (Type extends ActionCreator<any, infer V> ? V : never) extends (p: infer T) => infer T & any ? T : never
export type GetAlbumsType = ExtractActionPayloadType<typeof getAlbumsWithPhotos>;
export type SetFilterType = ExtractActionPayloadType<typeof setFilter>

