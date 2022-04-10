import {
  Component,
  OnInit
} from '@angular/core';
import {
  Album,
  ALBUMS_MOCK
} from "../../../../model/album";
import { ActivatedRoute } from "@angular/router";
import {
  Photo,
  PHOTOS_MOCK
} from "../../../../model/photo";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  isLoading = false;
  albumId = '';
  album: Album | undefined;
  photos: Photo[] = [];

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.albumId = params["id"];
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.album = ALBUMS_MOCK[0];
      this.photos = PHOTOS_MOCK.filter(photo => photo.albumId === this.album?.id);
      this.isLoading = false;
    }, 1000)

  }

}
