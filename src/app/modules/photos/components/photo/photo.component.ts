import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  Photo,
} from "../../../../model/photo";
import { DataService } from "../../../../services/data.service";
import { take } from "rxjs";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  public photoId: number;
  public photo: Photo;
  public isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.photoId = parseInt(this.activatedRoute.snapshot.params['id'], 10);

    this.dataService.getPhoto(this.photoId)
      .pipe(take(1))
      .subscribe(photo => {
        this.photo = photo;
        this.isLoading = false;
      })
  }

}
