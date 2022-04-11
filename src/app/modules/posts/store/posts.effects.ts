import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  init,
  initStateFromQueryParams,
  setFilter,
  setPageNum,
  setPosts,
} from "./posts.actions";
import {
  DataService,
  GetPostsParams
} from "../../../services/data.service";
import {
  catchError,
  debounceTime,
  delay,
  map,
  of,
  switchMap
} from "rxjs";
import {
  ActivatedRoute,
  Params,
  Router
} from "@angular/router";
import { Store } from "@ngrx/store";

export const PAGE_SIZE = 5;
const PAGE_SIZE_PARAM = 'pageSize';
const PAGE_NUM_PARAM = 'pageNum';
const FIELD_PARAM = 'field';
const EXP_PARAM = 'expression'

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
      delay(2000),
      switchMap((action) => {
        let params = this.activatedRoute.snapshot.queryParams
        let pageNumber = params[PAGE_NUM_PARAM] ? Number.parseInt(params[PAGE_NUM_PARAM],10) : 0;
        let getPostsParams: GetPostsParams = {
          pageSize: PAGE_SIZE,
          pageNumber: pageNumber,
          field: params[FIELD_PARAM],
          expression: params[EXP_PARAM]
        }
        return this.dataService.getPosts(getPostsParams).pipe(
          switchMap((postsCollection) => [
              setPosts({ postsCollection, error: undefined }),
              initStateFromQueryParams({ getPostsParams }),
            ]
          ),
          catchError(err => of(setPosts({ postsCollection: undefined, error: err })))
        )
      })
    );
  });

  $setFilter = createEffect(() => {
    return this.actions$.pipe(
      ofType(setFilter.type),
      debounceTime(300),
      switchMap(({ field, expression }) => {
        this.router.navigate(
          [],
          {
            // relativeTo: activatedRoute,
            queryParams: {
              [FIELD_PARAM]: field,
              [EXP_PARAM]: expression,
              [PAGE_NUM_PARAM]: 0,
              [PAGE_SIZE_PARAM]: PAGE_SIZE,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
        let getPostsParams: GetPostsParams = {
          pageSize: PAGE_SIZE,
          pageNumber: 0,
          field: field,
          expression: expression
        }
        return this.dataService.getPosts(getPostsParams).pipe(
          map((posts) => setPosts({ postsCollection:posts, error: undefined })),
          catchError(err => of(setPosts({ postsCollection: undefined, error: err })))
        )
      })
    );
  });

  $setPageNum = createEffect(() => {
    return this.actions$.pipe(
      ofType(setPageNum.type),
      switchMap(({ pageNum }) => {
        let params = this.activatedRoute.snapshot.queryParams;
        this.router.navigate(
          [],
          {
            // relativeTo: activatedRoute,
            queryParams: {
              ...params,
              [PAGE_NUM_PARAM]: pageNum,
            },
            queryParamsHandling: 'merge', // remove to replace all query params by provided
          });
        let getPostsParams: GetPostsParams = {
          pageSize: PAGE_SIZE,
          pageNumber: pageNum,
          field: params[FIELD_PARAM],
          expression: params[EXP_PARAM]
        }
        return this.dataService.getPosts(getPostsParams).pipe(
          map((postsCollection) => setPosts({ postsCollection, error: undefined })),
          catchError(err => of(setPosts({ postsCollection: undefined, error: err })))
        );
      })
    );
  });

}
