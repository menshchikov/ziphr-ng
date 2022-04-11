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
  selectPostsFilterExpression,
  selectPostsFilterField,
  selectPostsIsLoading,
  selectPostsPageNumber,
  selectPostsPosts,
  selectPostsTotalPages
} from "../../store/posts.selectors";
import {
  map,
  tap
} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  isLoading$ = this.store$.select(selectPostsIsLoading);
  posts$ = this.store$.select(selectPostsPosts);
  filter = {field:'userId', expression:''};
  filterExpression$ = this.store$.select(selectPostsFilterExpression).pipe(tap(exp => this.filter.expression = exp));
  filterField$ = this.store$.select(selectPostsFilterField).pipe(tap(field => this.filter.field = field));
  pageNum$ = this.store$.select(selectPostsPageNumber).pipe(tap(pageNum => this.pageNum = pageNum));
  pages$ = this.store$.select(selectPostsTotalPages).pipe(map(count => {
    const pagesArray = []
    this.totalPages = count;
    for(let i=0;i<count;i++){
      pagesArray.push(i);
    }
    return pagesArray;
  }))
  private pageNum: number;
  private totalPages: number;

  constructor(
    private store$: Store,
  ) { }


  ngOnInit(): void {
    this.store$.dispatch(init());
  }

  setFilterField(filterField: string) {
    this.store$.dispatch(setFilter({ ...this.filter, field:filterField}));
  }

  setFilterExpression($event: Event) {
    let target = ($event.currentTarget) as HTMLInputElement;
    let expression = target.value;
    this.store$.dispatch(setFilter({...this.filter, expression: expression }));
  }

  setPage(pageNum: number) {
    this.store$.dispatch(setPageNum({pageNum}));
  }

  prevPage() {
    if(this.pageNum === 0){
      return;
    }
    this.store$.dispatch(setPageNum({ pageNum: this.pageNum - 1 }));
  }

  nextPage() {
    if(this.pageNum === this.totalPages-1){
      return;
    }
    this.store$.dispatch(setPageNum({ pageNum: this.pageNum + 1 }));
  }
}
