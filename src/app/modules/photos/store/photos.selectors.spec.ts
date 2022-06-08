import * as fromPhotos from './photos.reducer';
import { selectPhotosState } from './photos.selectors';

describe('Photos Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPhotosState({
      [fromPhotos.photosFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
