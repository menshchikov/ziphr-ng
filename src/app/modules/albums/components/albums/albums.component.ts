import { Component, OnInit } from '@angular/core';
import {ALBUMS_MOCK} from "../../../../model/album";
import {
  Photo,
  PHOTOS_MOCK
} from "../../../../model/photo";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  filter = 'User';
  albums = ALBUMS_MOCK;
  colors: string[] = [
    'green', 'violet', 'lime', 'pink'
  ];
  albumPhotos: { [key: number]: Photo[] } = {};
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(()=>{
      PHOTOS_MOCK.forEach(p => {
        if(!this.albumPhotos[p.albumId]){
          this.albumPhotos[p.albumId] = [p];
        }else if(this.albumPhotos[p.albumId].length < 4){
          this.albumPhotos[p.albumId].push(p);
        }
      })
      this.isLoading = false;
    },1000)
  }

  setFilter(filter: string) {
    this.filter = filter;
  }
}
