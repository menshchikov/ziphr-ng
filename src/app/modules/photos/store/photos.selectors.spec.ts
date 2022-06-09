import * as fromPhotos from './photos.reducer';
import { selectPhotosState } from './photos.selectors';
import { initialState } from "./photos.reducer";

describe('Photos Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPhotosState({
      [fromPhotos.photosFeatureKey]: initialState
    });

    expect(result).toEqual(initialState );
  });
});
