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
  pageNum$ = this.store$.select(selectAlbumsPageNumber);
  pages$ = this.store$.select(selectAlbumsTotalPages);
  private filter: GetCollectionFilter;

  constructor(
    private store$: Store,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(init());
  }

  setFilterField(filterField: string, operator: 'eq'|'ct') {
    const filter: GetCollectionFilter = { ...this.filter, fieldName: filterField, operator };
    this.store$.dispatch(setFilter({ filter }));
  }

  setFilterExpression($event: Event) {
    const target = ($event.currentTarget) as HTMLInputElement;
    const expression = target.value;
    const filter: GetCollectionFilter = { ...this.filter, expression};
    this.store$.dispatch(setFilter({ filter }));
  }

  changePage($event: number) {
    this.store$.dispatch(setPageNum({ pageNum: $event }));
  }
}
