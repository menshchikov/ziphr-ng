import { Component, OnInit } from '@angular/core';
import { ALBUMS_MOCK } from "../../../../model/album";
import {
  Photo,
  PHOTOS_MOCK
} from "../../../../model/photo";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  filter = 'Album';
  isLoading = false;
  photos: Photo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.photos = PHOTOS_MOCK.filter(photo => photo.id < 5);
      this.isLoading = false;
    }, 1000)

  }

  setFilter(filter: string) {
    this.filter = filter;
  }

}
