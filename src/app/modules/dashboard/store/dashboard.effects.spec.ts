import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  Observable,
  of
} from 'rxjs';

import { DashboardEffects } from './dashboard.effects';
import {
  Collection,
  DataService
} from "../../../services/data.service";
import {
  cold,
  getTestScheduler,
  hot
} from "jasmine-marbles";
import { Post } from "../../../model/post.model";
import {
  DashboardState,
  initialState
} from "./dashboard.reducer";
import {
  Album,
  ALBUMS_MOCK
} from "../../../model/album";
import {
  Photo,
  PHOTOS_MOCK
} from "../../../model/photo";
import { POSTSMOCK } from "../../../model/posts-mock";

describe('DashboardEffects', () => {
  let actions$: Observable<any>;
  let effects: DashboardEffects;
  let dataServiceSpy: any;

  beforeEach(() => {

    dataServiceSpy = jasmine.createSpyObj(DataService,['getPosts', 'getAlbums','getPhotos']);
    dataServiceSpy.getPosts.and.returnValue(
      of(<Collection<Post>>{ items: [...POSTSMOCK.slice(0,7)], count: 7 })
    );
    dataServiceSpy.getAlbums.and.returnValue(
      of(<Collection<Album>>{ items: [...ALBUMS_MOCK.slice(0,7)], count: 7 })
    );
    dataServiceSpy.getPhotos.and.returnValue(
      of(<Collection<Photo>>{ items: [...PHOTOS_MOCK.slice(0, 7)], count: 7 })
    );

    TestBed.configureTestingModule({
      providers: [
        DashboardEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useValue: dataServiceSpy  }
      ]
    });

    effects = TestBed.inject(DashboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fetch data on init', () => {
    actions$ = hot('-a', {
      a: { type: '[Dashboard] init' },
    })

    const expected = hot('-a', {
      a: {
        type: '[Dashboard] setData',
        data: <DashboardState>{
          ...initialState,
          albumsCount: 7,
          isLoading: false,
          latestPhotos: PHOTOS_MOCK.slice(2,7),
          error: undefined,
          latestPosts: POSTSMOCK.slice(2,7),
          photosCount: 7,
          postsCount: 7
        },
      },
    });

    expect(effects.$init({
      debounce: 20,
      scheduler: getTestScheduler(),
    })).toBeObservable(expected);
  });

});
