import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  Photo,
} from "../../../../model/photo";
import { DataService } from "../../../../services/data.service";
import {
  catchError,
  finalize,
  of,
  take
} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  public photoIdStr: string;
  public photo: Photo;
  public isLoading = false;
  error: HttpErrorResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.photoIdStr = this.activatedRoute.snapshot.params['id'];

    const photoId = parseInt(this.photoIdStr, 10);
    this.dataService.getPhoto(photoId)
      .pipe(take(1),
        catchError(err => {
          this.error = err;
          return of(undefined);
        }),
        finalize(() => this.isLoading = false),
        )
      .subscribe(photo => {
        this.photo = photo;
      })
  }

}
