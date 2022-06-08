import * as fromPhotos from './photos.actions';

describe('init', () => {
  it('should return init action', () => {
    expect(fromPhotos.init().type).toBe('[Photos] init');
  });
});
