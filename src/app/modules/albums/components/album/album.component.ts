import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {
  GetCollectionFilter,
} from "../../../../services/data.service";
import {
  tap,
} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import {
  init,
  setFilter,
  setPageNum
} from "../../store/album.actions";
import {
  selectAlbumAlbum,
  selectAlbumAlbumId,
  selectAlbumIsLoading,
  selectAlbumPageNumber,
  selectAlbumPhotos,
  selectAlbumPhotosFilter,
  selectAlbumTotalPages
} from "../../store/album.selectors";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumComponent implements OnInit {
  private photosFilter: GetCollectionFilter;
  pageNum$ = this.store$.select(selectAlbumPageNumber);
  pagesTotalCount$ = this.store$.select(selectAlbumTotalPages);
  error: HttpErrorResponse;

  album$ = this.store$.select(selectAlbumAlbum);
  photos$ = this.store$.select(selectAlbumPhotos);
  filter$ = this.store$.select(selectAlbumPhotosFilter).pipe(tap(filter => this.photosFilter = filter));
  isLoading$ = this.store$.select(selectAlbumIsLoading);
  albumId$ = this.store$.select(selectAlbumAlbumId);

  constructor(
    private store$: Store,
  ) {
  }

  ngOnInit(): void {
    this.store$.dispatch(init());
  }

  setFilterExpression($event: Event) {
    const target = ($event.currentTarget) as HTMLInputElement;
    const expression = target.value;
    const filter: GetCollectionFilter = { ...this.photosFilter, expression};
    this.store$.dispatch(setFilter({ filter }));
  }

  pageChanged($event: number) {
    this.store$.dispatch(setPageNum({ pageNum: $event }));
  }
}
