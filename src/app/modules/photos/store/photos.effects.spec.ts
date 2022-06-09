import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PhotosEffects } from './photos.effects';
import { provideMockStore } from "@ngrx/store/testing";
import { initialState } from "./photos.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('PhotosEffects', () => {
  let actions$: Observable<any>;
  let effects: PhotosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState: initialState})
      ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });

    effects = TestBed.inject(PhotosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
