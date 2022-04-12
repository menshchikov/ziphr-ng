import { Component, OnInit } from '@angular/core';
import {
  Photo,
} from "../../../../model/photo";
import { Store } from "@ngrx/store";
import {
  selectAlbumsAlbumsWithPhotos,
  selectAlbumsFilter,
  selectAlbumsIsLoading,
  selectAlbumsPageNumber,
  selectAlbumsTotalPages
} from "../../store/albums.selectors";
import {
  init,
  setFilter,
  setPageNum
} from "../../store/albums.actions";
import {
  map,
  tap
} from "rxjs";
import { GetCollectionFilter } from "../../../../services/data.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  filter$ = this.store$.select(selectAlbumsFilter).pipe(tap(filter => this.filter = filter));
  albums$ = this.store$.select(selectAlbumsAlbumsWithPhotos);
  isLoading$ = this.store$.select(selectAlbumsIsLoading);
  pageNum$ = this.store$.select(selectAlbumsPageNumber).pipe(tap(pageNum => this.pageNum = pageNum));
  pages$ = this.store$.select(selectAlbumsTotalPages).pipe(map(count => {
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

  setFilterField(filterField: string, operator: 'eq'|'ct') {
    let filter: GetCollectionFilter = { ...this.filter, fieldName: filterField, operator };
    this.store$.dispatch(setFilter({ filter }));
  }

  setFilterExpression($event: Event) {
    let target = ($event.currentTarget) as HTMLInputElement;
    let expression = target.value;
    let filter: GetCollectionFilter = { ...this.filter, expression};
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
