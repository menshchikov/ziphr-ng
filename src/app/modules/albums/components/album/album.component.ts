import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Album,
} from "../../../../model/album";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  Photo,
} from "../../../../model/photo";
import {
  DataService,
  GetCollectionFilter,
  GetCollectionParams,
} from "../../../../services/data.service";
import {
  BehaviorSubject,
  debounceTime,
  skip,
  Subscription,
  take,
} from "rxjs";

const PHOTOS_PAGE_SIZE = 8;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {
  isAlbumLoading = false;
  isPhotosLoading = false;
  albumId = '';
  album: Album | undefined;
  photos: Photo[] = [];
  filterExpression$ = new BehaviorSubject<string>('');
  private searchSubscription: Subscription;
  private photosFilter: GetCollectionFilter = {fieldName: 'title', expression: '', operator: 'ct'};
  totalCount: number;
  currentPageNum = 0;
  pagesArray: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.albumId = this.activatedRoute.snapshot.params['id'];

    const params = this.dataService.parseQueryParamsToCollectionParams(this.activatedRoute.snapshot.queryParams);
    if (params?.filters?.length) {
      this.currentPageNum = params.pageNumber;
      this.photosFilter = params.filters[0];
    }
    this.getPhotos();

    this.isAlbumLoading = true;
    this.dataService.getAlbum(parseInt(this.albumId, 10))
      .pipe(take(1))
      .subscribe((album) => {
        this.album = album;
        this.isAlbumLoading = false;
      });

    this.searchSubscription = this.filterExpression$.pipe(
      skip(1), // ignore initial value
      debounceTime(400),
    ).subscribe((expression) => {
      this.photosFilter = {...this.photosFilter, expression};
      this.currentPageNum = 0;
      this.getPhotos();
    });
  }

  setFilterExpression($event: Event) {
    let target = ($event.currentTarget) as HTMLInputElement;
    let expression = target.value;
    this.filterExpression$.next(expression);
  }

  private getPhotos() {
    const getPhotosParams: GetCollectionParams = {
      pageSize: PHOTOS_PAGE_SIZE,
      pageNumber: this.currentPageNum,
      filters: [this.photosFilter]
    };

    // update query string
    const queryParams = this.dataService.parseCollectionParamsToQueryParams(getPhotosParams);
    this.router.navigate(
      [],
      {
        // relativeTo: activatedRoute,
        queryParams: {
          ...queryParams
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    // filter by albumId
    getPhotosParams.filters.push({ fieldName: 'albumId', expression: this.albumId, operator: 'eq' },)

    this.isPhotosLoading = true;
    this.dataService.getPhotos(getPhotosParams)
      .subscribe(collection => {
        this.photos = collection.items;
        this.totalCount = Math.ceil(collection.count / PHOTOS_PAGE_SIZE);
        this.isPhotosLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  pageChanged($event: number) {
    this.currentPageNum = $event;
    this.getPhotos();
  }
}
