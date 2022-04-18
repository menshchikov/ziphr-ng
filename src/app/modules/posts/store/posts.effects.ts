import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  getPosts,
  GetPostsType,
  init,
  initStateFromQueryParams,
  setFilter,
  SetFilterType,
  setPageNum,
  setPosts,
} from "./posts.actions";
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
import { initialState } from "../../albums/store/albums.reducer";

@Injectable()
export class PostsEffects {

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
        if (!getCollectionParams?.filters?.length) {
          getCollectionParams.filters = [initialState.filter];
        }
        return [
          initStateFromQueryParams({ getCollectionParams }),
          getPosts({ getCollectionParams })
        ];
      })
    );
  });

  $getPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPosts.type),
      tap((action: GetPostsType) => {
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
      switchMap(({ getCollectionParams }) => {
        return this.dataService.getPosts(getCollectionParams).pipe(
          map((postsCollection) => setPosts({ postsCollection, error: undefined })),
          catchError(err => of(setPosts({ postsCollection: undefined, error: err })))
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
        return getPosts({ getCollectionParams });
      })
    );
  });

  $setPageNum = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPageNum.type),
      map(({ pageNum }) => {
        const params = this.activatedRoute.snapshot.queryParams;
        const getCollectionParams = this.dataService.parseQueryParamsToCollectionParams(params);
        getCollectionParams.pageNumber = pageNum;
        return getPosts({ getCollectionParams })
      })
    );
  });

}
