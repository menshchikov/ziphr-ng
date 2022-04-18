import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  Store
} from "@ngrx/store";
import {
  init,
  setFilter,
  setPageNum
} from '../../store/posts.actions';
import {
  selectPostsFilter,
  selectPostsIsLoading,
  selectPostsPageNumber,
  selectPostsPosts,
  selectPostsTotalPages
} from "../../store/posts.selectors";
import {
  map,
  tap
} from "rxjs";
import { GetCollectionFilter } from "../../../../services/data.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  isLoading$ = this.store$.select(selectPostsIsLoading);
  posts$ = this.store$.select(selectPostsPosts);
  filter$ = this.store$.select(selectPostsFilter).pipe(tap(filter => this.filter = filter));
  pageNum$ = this.store$.select(selectPostsPageNumber);
  pages$ = this.store$.select(selectPostsTotalPages);
  private filter: GetCollectionFilter;

  constructor(
    private store$: Store,
  ) { }


  ngOnInit(): void {
    this.store$.dispatch(init());
  }

  setFilterField(fieldName: string, operator: 'eq' | 'ct') {
    const filter = { ...this.filter, fieldName, operator };
    this.store$.dispatch(setFilter({ filter }));
  }

  setFilterExpression($event: Event) {
    const target = ($event.currentTarget) as HTMLInputElement;
    const expression = target.value;
    const filter = { ...this.filter, expression };
    this.store$.dispatch(setFilter({ filter }));
  }

  pageChanged($event: number) {
    this.store$.dispatch(setPageNum({ pageNum: $event }));
  }
}
