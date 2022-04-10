import * as fromDashboard from './dashboard.actions';

describe('dBDashboards', () => {
  it('should return an action', () => {
    expect(fromDashboard.init().type).toBe('[Dashboard] init');
  });
});
