import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  Photo,
  PHOTOS_MOCK
} from "../../../../model/photo";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  public photoId = '';
  public photo: Photo|undefined;
  public isLoading = false;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.photoId = params["id"];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.photo = PHOTOS_MOCK[0];
      this.isLoading = false;
    },1000)

  }

}
