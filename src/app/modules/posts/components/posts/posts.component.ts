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
  private filter: GetCollectionFilter;

  constructor(
    private store$: Store,
  ) { }


  ngOnInit(): void {
    this.store$.dispatch(init());
  }

  setFilterField(fieldName: string, operator: 'eq' | 'ct') {
    let filter = { ...this.filter, fieldName, operator };
    this.store$.dispatch(setFilter({ filter }));
  }

  setFilterExpression($event: Event) {
    let target = ($event.currentTarget) as HTMLInputElement;
    let expression = target.value;
    let filter = { ...this.filter, expression };
    this.store$.dispatch(setFilter({ filter }));
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
