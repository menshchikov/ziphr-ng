import { dashboardReducer, initialState } from './dashboard.reducer';

describe('Dashboard Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = dashboardReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
