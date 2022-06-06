import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  getAlbum,
  init,
  initStateFromQueryParams,
  setAlbum,
  setFilter,
  setPageNum,
  SetFilterType,
  getPhotos,
  GetPhotosType,
  setPhotos,
  GetAlbumType,
} from "./album.actions";
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
  tap,
  withLatestFrom
} from "rxjs";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  Store
} from "@ngrx/store";
import {
  initialState,
  PHOTOS_PAGE_SIZE
} from "./album.reducer";
import {
  selectRouteParams,
} from "../../../store/app.selector";

@Injectable()
export class AlbumEffects {

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
      withLatestFrom(this.store$.select(selectRouteParams)),
      switchMap(([action, routerParams]) => {
        const params = this.activatedRoute.snapshot.queryParams;

        const albumIdStr = routerParams['id'];
        const albumId = parseInt(albumIdStr, 10);

        const getCollectionParams = this.dataService.parseQueryParamsToCollectionParams(params);
        if(!getCollectionParams?.filters?.length) {
          getCollectionParams.filters = [
            initialState.photosFilter,
            // { fieldName: 'albumId', expression: albumIdStr, operator: 'eq' }
          ];
        }
        getCollectionParams.pageSize = PHOTOS_PAGE_SIZE;
        const queryParams = this.dataService.parseCollectionParamsToQueryParams(getCollectionParams);
        this.router.navigate(
          [],
          {
            // relativeTo: activatedRoute,
            queryParams: {
              ...queryParams
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });

        return [
            initStateFromQueryParams({ getCollectionParams }),
            getAlbum({ albumId }),
            getPhotos({getCollectionParams})
          ];
      })
    );
  });

  $getAlbum = createEffect(() =>{
    return this.actions$.pipe(
      ofType(getAlbum.type),
      switchMap((action: GetAlbumType) => {
        return this.dataService.getAlbum(action.albumId).pipe(
          map((album) => setAlbum({ album, error: undefined })),
          catchError(err => of(setAlbum({ album: undefined, error: err })))
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
        return getPhotos({ getCollectionParams });
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
        return getPhotos({getCollectionParams})
      })
    );
  });

  $getPhotos = createEffect(() =>{
    return this.actions$.pipe(
      ofType(getPhotos.type),
      switchMap((action: GetPhotosType) => {
        return this.dataService.getPhotos({...action.getCollectionParams}).pipe(
          map((collection) => setPhotos({ photos:collection, error: undefined })),
          catchError(err => of(setPhotos({ photos: undefined, error: err })))
        )
      })
    )
  })

}
