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
  Album,
} from "../../../model/album";
import { HttpErrorResponse } from "@angular/common/http";
import { Photo } from "../../../model/photo";

export const init = createAction(
  '[Album] init',
);

export const getAlbum = createAction(
  '[Album] getAlbum',
  props<{ albumId: number }>()
);

export const setAlbum = createAction(
  '[Album] setAlbum',
  props<{ album: Album, error: HttpErrorResponse }>()
);

export const getPhotos = createAction(
  '[Album] getPhotos',
  props<{ getCollectionParams: GetCollectionParams }>()
);

export const setPhotos = createAction(
  '[Album] setPhotos',
  props<{ photos: Collection<Photo>, error: HttpErrorResponse }>()
);

export const setFilter = createAction(
  '[Album] setFilter',
  props<{ filter: GetCollectionFilter}>()
)

export const setPageNum = createAction(
  '[Album] setPageNum',
  props<{ pageNum: number}>()
)

export const initStateFromQueryParams = createAction(
  '[Album] initStateFromQueryParams',
  props<{ getCollectionParams: GetCollectionParams}>()
)

type ExtractActionPayloadType<Type> = (Type extends ActionCreator<any, infer V> ? V : never) extends (p: infer T) => infer T & any ? T : never
export type GetAlbumType = ExtractActionPayloadType<typeof getAlbum>;
export type GetPhotosType = ExtractActionPayloadType<typeof getPhotos>;
export type SetFilterType = ExtractActionPayloadType<typeof setFilter>

