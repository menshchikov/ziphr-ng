import { Component, OnInit } from '@angular/core';
import { Post } from "../../../../model/post.model";
import { POSTSMOCK } from "../../../../model/posts-mock";
import {
  Photo,
  PHOTOS_MOCK
} from "../../../../model/photo";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;
  photos: Photo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.photos = PHOTOS_MOCK.filter(a => a.id < 10);
      this.posts = POSTSMOCK.filter(p => p.id < 10);
      this.isLoading = false;
    },2000)

  }

}
