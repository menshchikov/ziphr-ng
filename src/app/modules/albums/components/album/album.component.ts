import {
  Component,
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
  GetCollectionParams,
} from "../../../../services/data.service";
import {
  BehaviorSubject,
  debounceTime,
  Subscription,
  take,
} from "rxjs";

const PHOTOS_PAGE_SIZE = 8;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  isAlbumLoading = false;
  isPhotosLoading = false;
  albumId = '';
  album: Album | undefined;
  photos: Photo[] = [];
  filterExpression$ = new BehaviorSubject<string>('');
  private searchSubscription: Subscription;
  private expression: string;
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
      this.expression = params.filters.find(f => f.fieldName === 'title')?.expression;
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
      debounceTime(400),
    ).subscribe((expression) => {
      this.expression = expression;
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
      filters: [
        { fieldName: 'albumId', expression: this.albumId, operator: 'eq' },
        { fieldName: 'title', expression: this.expression, operator: 'ct' }
      ]
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

    this.isPhotosLoading = true;
    this.dataService.getPhotos(getPhotosParams)
      .subscribe(collection => {
        this.photos = collection.items;
        this.totalCount = Math.ceil(collection.count / PHOTOS_PAGE_SIZE);
        this.createPagesArray();
        this.isPhotosLoading = false;
      });
  }

  private createPagesArray() {
    let array = [];
    for (let i = 0; i < this.totalCount; i++) {
      array.push(i);
    }
    this.pagesArray = array;
  }

  setPage(num: number) {
    this.currentPageNum = num;
    this.getPhotos();
  }

  nextPage() {
    if(this.currentPageNum === this.totalCount-1){
      return;
    }
    this.currentPageNum += 1;
    this.getPhotos();
  }

  prevPage() {
    if(this.currentPageNum === 0){
      return;
    }
    this.currentPageNum -= 1;
    this.getPhotos();
  }
}
