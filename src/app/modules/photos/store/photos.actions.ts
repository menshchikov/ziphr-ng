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
import { Photo } from "../../../model/photo";

export const init = createAction(
  '[Photos] init'
);

export const getPhotos = createAction(
  '[Photos] getPhotos',
  props<{ getCollectionParams: GetCollectionParams }>()
);

export const initStateFromQueryParams = createAction(
  '[Photos] initStateFromQueryParams',
  props<{ getCollectionParams: GetCollectionParams }>()
);

export const setPhotos = createAction(
  '[Photos] setPhotos',
  props<{ photosCollection: Collection<Photo>, error: Error }>()
);

export const setFilter = createAction(
  '[Photos] setFilter',
  props<{ filter: GetCollectionFilter }>()
);
export const setPageNum = createAction(
  '[Photos] setPageNum',
  props<{ pageNum: number}>()
)

type ExtractActionPayloadType<Type> = (Type extends ActionCreator<any, infer V> ? V : never) extends (p: infer T) => infer T & any ? T : never
export type SetFilterType = ExtractActionPayloadType<typeof setFilter>
export type SetPageNumType = ExtractActionPayloadType<typeof setPageNum>
