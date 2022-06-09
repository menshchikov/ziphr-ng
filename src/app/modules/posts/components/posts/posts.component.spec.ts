import {
  ComponentFixture,
  TestBed,
  waitForAsync
} from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {
  MockStore,
  provideMockStore
} from "@ngrx/store/testing";
import {
  MemoizedSelector,
  Store
} from "@ngrx/store";
import {
  selectPostsFilter,
  selectPostsIsLoading,
  selectPostsPageNumber,
  selectPostsPosts,
  selectPostsTotalPages
} from "../../store/posts.selectors";
import { PostsState } from "../../store/posts.reducer";
import { GetCollectionFilter } from "../../../../services/data.service";
import { Post } from "../../../../model/post";
import { UtilsModule } from "../../../utils/utils.module";
import { POSTS_MOCK } from "../../../../mocks/posts.mock";
import { RouterTestingModule } from "@angular/router/testing";

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let store: MockStore<PostsState>;

  let selectPostsIsLoadingMock:  MemoizedSelector<PostsState, boolean>;
  let selectPostsPostsMock: MemoizedSelector<PostsState, Post[]>;
  let selectPostsFilterMock: MemoizedSelector<PostsState, GetCollectionFilter>;
  let selectPostsPageNumberMock: MemoizedSelector<PostsState, number>;
  let selectPostsTotalPagesMock: MemoizedSelector<PostsState, number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      imports: [UtilsModule, RouterTestingModule],
      providers: [
        provideMockStore()
      ]
    })
    .compileComponents();

    store = TestBed.inject<any>(Store);

    selectPostsFilterMock = store.overrideSelector(selectPostsFilter, undefined);
    selectPostsIsLoadingMock = store.overrideSelector(selectPostsIsLoading, false);
    selectPostsPostsMock = store.overrideSelector(selectPostsPosts, []);
    selectPostsPageNumberMock = store.overrideSelector(selectPostsPageNumber, 0);
    selectPostsTotalPagesMock = store.overrideSelector(selectPostsTotalPages, 0);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading, filter', waitForAsync(() => {
    selectPostsIsLoadingMock.setResult(true);
    selectPostsFilterMock.setResult({ fieldName:'userId', expression: 'abc', operator: 'eq' });
    store.refreshState();

    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-ref="loading"]')).not.toBeNull();
      expect(el.querySelector<HTMLElement>('.btn-group>button').innerText === 'userId').toBeTrue();
      expect(el.querySelector<HTMLInputElement>('.btn-group>input').value === 'abc').toBeTrue();
      expect(el.querySelector('.table')).toBeNull();
    });
  }));

  it('should show table', waitForAsync(() => {
    selectPostsIsLoadingMock.setResult(false);
    selectPostsPostsMock.setResult([...POSTS_MOCK.slice(0, 3)]);
    selectPostsFilterMock.setResult({ fieldName:'title', expression: 'abc', operator: 'ct' });
    selectPostsPageNumberMock.setResult(0);
    selectPostsTotalPagesMock.setResult(1);
    store.refreshState();

    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-ref="loading"]')).toBeNull();
      expect(el.querySelector<HTMLElement>('.btn-group>button').innerText === 'title').toBeTrue();
      expect(el.querySelector<HTMLInputElement>('.btn-group>input').value === 'abc').toBeTrue();
      expect(el.querySelectorAll('.table tr').length === 4).toBeTrue(); // th + 3 posts
    });
  }));

  it('should show table with paging', waitForAsync(() => {
    selectPostsIsLoadingMock.setResult(false);
    selectPostsPostsMock.setResult([...POSTS_MOCK.slice(0, 4)]);
    selectPostsFilterMock.setResult({ fieldName:'title', expression: 'abc', operator: 'ct' });
    selectPostsPageNumberMock.setResult(1);
    selectPostsTotalPagesMock.setResult(2);
    store.refreshState();

    fixture = TestBed.createComponent(PostsComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('[data-ref="loading"]')).toBeNull();
      expect(el.querySelectorAll('.table tr').length === 5).toBeTrue(); // th + posts
      expect(el.querySelectorAll('app-paginator li').length === 4).toBeTrue(); // prev 0 1 next
    });
  }));

});
