import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';

import {
  switchMap,
  map,
  catchError,
  of,
  tap,
  debounceTime,
} from 'rxjs';

import * as PhotosActions from './photos.actions';
import {
  Collection,
  DataService,
  GetCollectionParams,
} from "../../../services/data.service";
import { Photo } from "../../../model/photo";
import {
  Params,
  Router
} from "@angular/router";
import { Store } from "@ngrx/store";
import { selectQueryParams } from "../../../store/app.selector";
import {
  setPageNum,
  SetPageNumType
} from "./photos.actions";
import { PHOTOS_PAGE_SIZE } from "./photos.reducer";
import { initialState } from "../../albums/store/albums.reducer";

@Injectable()
export class PhotosEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store$: Store,
  ) {}

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PhotosActions.init),
      concatLatestFrom(() => this.store$.select(selectQueryParams)),
      // concatMap(() => EMPTY as Observable<{ type: string }>)
      switchMap(([action, queryParams = {}]: [any, Params]) => {
        const getCollectionParams = this.dataService.parseQueryParamsToCollectionParams(queryParams);
        getCollectionParams.pageSize = PHOTOS_PAGE_SIZE;
        if (!getCollectionParams?.filters?.length) {
          getCollectionParams.filters = [initialState.filter];
        }
        return [
          PhotosActions.getPhotos({ getCollectionParams }),
          PhotosActions.initStateFromQueryParams({ getCollectionParams }),
        ]
      })
    );
  });

  getPhotos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PhotosActions.getPhotos),
      tap(action => {
        // update query string
        const queryParams = this.dataService.parseCollectionParamsToQueryParams(action.getCollectionParams);
        this.router.navigate(
          [],
          {
            // relativeTo: activatedRoute,
            queryParams: {
              ...queryParams
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
      }),
      switchMap(action => {
        return this.dataService.getPhotos(action.getCollectionParams).pipe(
          map((result:Collection<Photo> )=> PhotosActions.setPhotos({photosCollection: result, error: undefined})),
          catchError(err => of(PhotosActions.setPhotos({photosCollection: undefined, error: err}))
          )
        )
      }),
    );
  });

  $setFilter = createEffect(() => {
    return this.actions$.pipe(
      ofType(PhotosActions.setFilter.type),
      debounceTime(400),
      map((action: PhotosActions.SetFilterType) => {
        const getCollectionParams: GetCollectionParams = {
          pageSize: PHOTOS_PAGE_SIZE,
          pageNumber: 0,
          filters: [action.filter]
        }
        return PhotosActions.getPhotos({ getCollectionParams });
      })
    );
  });

  $setPageNum = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPageNum.type),
      concatLatestFrom(() => this.store$.select(selectQueryParams)),
      map(([action, queryParams]:[SetPageNumType, Params]) => {
        const getCollectionParams= this.dataService.parseQueryParamsToCollectionParams(queryParams);
        getCollectionParams.pageNumber = action.pageNum;
        getCollectionParams.pageSize = PHOTOS_PAGE_SIZE;
        return PhotosActions.getPhotos({getCollectionParams})
      })
    );
  });

}
