import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  init,
  setData
} from "./dashboard.actions";
import {
  Collection,
  DataService
} from "../../../services/data.service";
import {
  asyncScheduler,
  catchError,
  combineLatest,
  map,
  of,
  switchMap
} from "rxjs";
import {
  DashboardState,
  initialState
} from "./dashboard.reducer";
import { Post } from "../../../model/post";
import { Album } from "../../../model/album";
import { Photo } from "../../../model/photo";


@Injectable()
export class DashboardEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {
  }

  $init = createEffect(() => ({
                                // assign default values
                                debounce = 300,
                                scheduler = asyncScheduler
                              } = {}) => this.actions$.pipe(
    ofType(init.type),
    switchMap(action => {
      return combineLatest([
        this.dataService.getPosts(),
        this.dataService.getAlbums(),
        this.dataService.getPhotos(),
      ]).pipe(
        map(([postsCollection, albumsCollection, photosCollection]: [Collection<Post>, Collection<Album>, Collection<Photo>]) => {
          const result = <DashboardState>({
            ...initialState,
            photosCount: photosCollection.items.length,
            albumsCount: albumsCollection.items.length,
            postsCount: postsCollection.items.length,
            latestPosts: postsCollection.items.slice(postsCollection.count - 5),
            latestPhotos: photosCollection.items.slice(photosCollection.count - 5),
          });
          return setData({ data: result });
        }),
        catchError(err => {
          const state = { ...initialState, error: new Error(err) };
          return of(setData({ data: state }));
        })
      )
    })
  ));

}
