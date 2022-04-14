import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {
  MockStore,
  provideMockStore
} from "@ngrx/store/testing";
import {
  Store
} from "@ngrx/store";
import {
  DashboardState,
  initialState
} from "../../store/dashboard.reducer";
import {
  selectDashboardIsLoading,
  selectDashboardState
} from "../../store/dashboard.selectors";
import { UtilsModule } from "../../../utils/utils.module";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        UtilsModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectDashboardState,
              value: { ...initialState }
            }
          ]
        }),
      ]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    store = TestBed.inject<any>(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading and header only', waitForAsync(() => {
    store.overrideSelector(selectDashboardState, {
      ...initialState,
      isLoading: true,
      error: new Error('some error'),
      postsCount: 1,
      photosCount: 1,
      latestPosts: [],
      latestPhotos: []
    });
    store.overrideSelector(selectDashboardIsLoading, true);

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-ref="loading-indicator"]')).not.toBeNull();
      expect(el.querySelector('[data-ref="header"]')).not.toBeNull();
      expect(el.querySelector('app-error-msg')).toBeNull();
      expect(el.querySelector('[data-ref="statistics-card"]')).toBeNull();
      expect(el.querySelector('[data-ref="posts-card"]')).toBeNull();
      expect(el.querySelector('[data-ref="photos-card"]')).toBeNull();
    });
  }));

  it('should show error only', waitForAsync(() => {
    store.overrideSelector(selectDashboardState, {
      ...initialState,
      isLoading: false,
      error: new Error('some error'),
      postsCount: 1,
      photosCount: 1,
      latestPosts: [],
      latestPhotos: []
    });
    store.overrideSelector(selectDashboardIsLoading, false);

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-ref="loading-indicator"]')).toBeNull();
      expect(el.querySelector('[data-ref="header"]')).not.toBeNull();
      expect(el.querySelector('app-error-msg')).not.toBeNull();
      expect(el.querySelector('[data-ref="statistics-card"]')).toBeNull();
      expect(el.querySelector('[data-ref="posts-card"]')).toBeNull();
      expect(el.querySelector('[data-ref="photos-card"]')).toBeNull();
    });
  }));

  it('should show cards', waitForAsync(() => {
    store.overrideSelector(selectDashboardState, {
      ...initialState,
      isLoading: false,
      error: undefined,
      postsCount: 1,
      photosCount: 1,
      latestPosts: [],
      latestPhotos: []
    });
    store.overrideSelector(selectDashboardIsLoading, false);

    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-ref="loading-indicator"]')).toBeNull();
      expect(el.querySelector('[data-ref="header"]')).not.toBeNull();
      expect(el.querySelector('app-error-msg')).toBeNull();
      expect(el.querySelector('[data-ref="statistics-card"]')).not.toBeNull();
      expect(el.querySelector('[data-ref="posts-card"]')).not.toBeNull();
      expect(el.querySelector('[data-ref="photos-card"]')).not.toBeNull();
    });
  }));

});
