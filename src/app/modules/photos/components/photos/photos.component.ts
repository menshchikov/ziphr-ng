import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  Photo,
} from "../../../../model/photo";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {
  DataService,
  GetCollectionFilter,
  GetCollectionParams
} from "../../../../services/data.service";
import {
  BehaviorSubject,
  debounceTime,
  skip,
  Subscription,
  tap
} from "rxjs";

const PHOTOS_PAGE_SIZE = 8;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnDestroy {
  filter: GetCollectionFilter = {fieldName:'albumId', expression: '', operator: 'eq'};
  isLoading = false;
  photos: Photo[] = [];
  currentPageNum: number;
  private searchSubscription: Subscription;
  private filterExpression$ = new BehaviorSubject<string>('');
  totalCount: number;
  pagesArray: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const params = this.dataService.parseQueryParamsToCollectionParams(this.activatedRoute.snapshot.queryParams);
    this.currentPageNum = params.pageNumber;
    if(params.filters[0]) {
      this.filter = params.filters[0];
    }
    this.getPhotos();


    this.searchSubscription = this.filterExpression$.pipe(
      tap(expression => this.filter = {...this.filter, expression}),
      skip(1), // ignore initial value
      debounceTime(400),
    ).subscribe((expression) => {
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
      filters: [ this.filter ]
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

    this.isLoading = true;
    this.dataService.getPhotos(getPhotosParams)
      .subscribe(collection => {
        this.photos = collection.items;
        this.totalCount = Math.ceil(collection.count / PHOTOS_PAGE_SIZE);
        this.createPagesArray();
        this.isLoading = false;
      });
  }

  private createPagesArray() {
    let array = [];
    for (let i = 0; i < this.totalCount; i++) {
      array.push(i);
    }
    this.pagesArray = array;
  }

  setFilterField(fieldName: string, operator: 'eq' | 'ct') {
    this.filter = { ...this.filter, fieldName, operator };
    this.getPhotos();
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  pageChange($event: number) {
    this.currentPageNum = $event;
    this.getPhotos();
  }
}
