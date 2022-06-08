import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PhotosEffects } from './photos.effects';

describe('PhotosEffects', () => {
  let actions$: Observable<any>;
  let effects: PhotosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PhotosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
