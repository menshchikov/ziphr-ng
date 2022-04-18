import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  getAlbumsWithPhotos,
  GetAlbumsType,
  init,
  initStateFromQueryParams,
  setAlbumsWithPhotos,
  setFilter,
  setPageNum,
  SetFilterType,
} from "./albums.actions";
import {
  DataService,
  GetCollectionParams,
  PAGE_SIZE,
} from "../../../services/data.service";
import {
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
  tap
} from "rxjs";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  Store
} from "@ngrx/store";
import { initialState } from "./albums.reducer";

@Injectable()
export class AlbumsEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store$: Store,
  ) {
  }

  $init = createEffect(() => {
    return this.actions$.pipe(
      ofType(init.type),
      switchMap((action) => {
        const params = this.activatedRoute.snapshot.queryParams
        const getCollectionParams = this.dataService.parseQueryParamsToCollectionParams(params);
        if(!getCollectionParams?.filters?.length) {
          getCollectionParams.filters = [initialState.filter];
        }
        return [
            initStateFromQueryParams({ getCollectionParams }),
            getAlbumsWithPhotos({ getCollectionParams })
          ];
      })
    );
  });

  $getAlbums = createEffect(() =>{
    return this.actions$.pipe(
      ofType(getAlbumsWithPhotos.type),
      tap((action: GetAlbumsType) => {
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
      switchMap(({getCollectionParams}) => {
        return this.dataService.getAlbumsWithPhotos(getCollectionParams).pipe(
          map((collection) => setAlbumsWithPhotos({ collection, error: undefined })),
          catchError(err => of(setAlbumsWithPhotos({ collection: undefined, error: err })))
        )
      })
    )
  })

  $setFilter = createEffect(() => {
    return this.actions$.pipe(
      ofType(setFilter.type),
      debounceTime(400),
      map((action: SetFilterType) => {
        const getCollectionParams: GetCollectionParams = {
          pageSize: PAGE_SIZE,
          pageNumber: 0,
          filters: [action.filter]
        }
        return getAlbumsWithPhotos({ getCollectionParams });
      })
    );
  });

  $setPageNum = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPageNum.type),
      map(({ pageNum }) => {
        const params = this.activatedRoute.snapshot.queryParams;
        const getCollectionParams= this.dataService.parseQueryParamsToCollectionParams(params);
        getCollectionParams.pageNumber = pageNum;
        return getAlbumsWithPhotos({getCollectionParams})
      })
    );
  });

}
