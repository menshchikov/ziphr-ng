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
  catchError,
  combineLatest,
  delay,
  map,
  of,
  switchMap
} from "rxjs";
import {
  DashboardState,
  initialState
} from "./dashboard.reducer";
import { Post } from "../../../model/post.model";
import { Album } from "../../../model/album";
import { Photo } from "../../../model/photo";


@Injectable()
export class DashboardEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {
  }

  $init = createEffect(() => this.actions$.pipe(
    ofType(init.type),
    delay(2000),
    switchMap(action => {
      return combineLatest([
        this.dataService.getPosts(),
        this.dataService.getAlbums(),
        this.dataService.getPhotos(),
      ]).pipe(
        map(([postsCollection, albums, photos]: [Collection<Post>, Album[], Photo[]]) => {
          const result = <DashboardState>({
            ...initialState,
            photosCount: photos.length,
            albumsCount: albums.length,
            postsCount: postsCollection.items.length,
            latestPosts: postsCollection.items.slice(postsCollection.count-5),
            latestPhotos: photos.slice(photos.length-5),
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
