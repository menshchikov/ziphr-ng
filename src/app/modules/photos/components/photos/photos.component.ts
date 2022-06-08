import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
} from "@angular/router";
import {
  DataService,
  GetCollectionFilter,
} from "../../../../services/data.service";
import {
  tap
} from "rxjs";
import { Store } from "@ngrx/store";
import {
  init,
  setFilter,
  setPageNum
} from '../../store/photos.actions';
import {
  selectPhotosFilter,
  selectPhotosIsLoading,
  selectPhotosPageNum,
  selectPhotosPhotos,
  selectPhotosTotalCount
} from "../../store/photos.selectors";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  filter$ = this.store$.select(selectPhotosFilter).pipe(tap(filter => this.filter = filter))
  private filter: GetCollectionFilter;
  isLoading$ = this.store$.select(selectPhotosIsLoading);
  photos$ = this.store$.select(selectPhotosPhotos);
  currentPageNum$ = this.store$.select(selectPhotosPageNum);
  totalCount$ = this.store$.select(selectPhotosTotalCount);

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private store$: Store,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(init());
  }

  setFilterExpression($event: Event) {
    const target = ($event.currentTarget) as HTMLInputElement;
    const expression = target.value;
    const filter: GetCollectionFilter = { ...this.filter, expression};
    this.store$.dispatch(setFilter({ filter }));
  }

  setFilterField(filterField: string, operator: 'eq'|'ct') {
    const filter: GetCollectionFilter = { ...this.filter, fieldName: filterField, operator };
    this.store$.dispatch(setFilter({ filter }));
  }

  pageChange($event: number) {
    this.store$.dispatch(setPageNum({ pageNum: $event }));
  }
}
