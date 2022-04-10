import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DashboardEffects } from './dashboard.effects';
import { DataService } from "../../../services/data.service";

describe('DashboardEffects', () => {
  let actions$: Observable<any>;
  let effects: DashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useValue: {}  }
      ]
    });

    effects = TestBed.inject(DashboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
